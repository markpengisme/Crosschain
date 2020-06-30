const express = require('express');
const request = require('request');
const hashMap = require('hashmap');
const crypto = require('crypto');
const bodyParser = require('body-parser');

class SecureChannel {
    constructor(address, ip, apiPort, everytime = true) {
        this.address = address;
        this.ip = ip;
        this.apiPort = apiPort;
        this.map = new hashMap();
        /*{
          stage: 'init' -> 'final' -> 'ok'
          myCrpto: my cryptography
          myPK: my public key
          cpPK: counter part public key
          secret: session key
          pov: period of validity
        }*/
        this.POV_TIME = 60*60*1000;
        this.ECDH_CURVE = "secp256k1";
        this.AES_ALG = "aes-256-cbc";
        this.iv = "1234567812345678";
        this.salt = "NTUSTNTUSTNTUST!";
        this.BUILD_SECURE_CHANNEL_EVERYTIME = everytime;

    }

    checkHash(data) {
        let hash = data.hash;
        delete data.hash;
        if (hash != crypto.createHash('sha256').update(JSON.stringify(data)+this.salt).copy().digest('hex'))
        {
            this.map.set(data.myAddress,{});
            throw "Hash value is different";
        } else {
            console.log("Hash correrct");
        }
    }
    checkTS(data) {
        if ( parseInt(data.TS)+3000 < Date.now())
        {
            throw "Too long time";
        }
    }
    
    async checkStatus(cpAddress, cpIP, cpApiPort) {
        let body;
        let status = this.map.get(cpAddress);
        if( this.BUILD_SECURE_CHANNEL_EVERYTIME = false &&
            status != undefined && status.pov && status.stage &&
            status.pov > Date.now()  && status.stage == 'ok')
        {
            console.log('--------------------------');
            console.log("Secure channel is open => Challenge");
            body = await this.keyExchangeChallengeReq(cpAddress, cpIP, cpApiPort);
        } else {
            console.log("No secure channel, or expired => Build new one");
            body = await this.buildSecureChannel(cpAddress, cpIP, cpApiPort);
        }
        return body.message != "fail" ? true : false;
    }

    encrypt (cpAddress, data) {        
        let status = this.map.get(cpAddress);
        let buff = Buffer.from(status.secret, 'hex');
        if(this.BUILD_SECURE_CHANNEL_EVERYTIME){this.map.set(cpAddress, {});}
        let cipher = crypto.createCipheriv(this.AES_ALG, buff, this.iv)
        let encrypted = cipher.update(data,'utf8','hex')
        encrypted += cipher.final('hex');
        console.log("Successfully encrypted:",encrypted);
        return encrypted;
    }

    decrypt (cpAddress, encrypted) {
        let status = this.map.get(cpAddress);
        let buff = Buffer.from(status.secret, 'hex');
        if(this.BUILD_SECURE_CHANNEL_EVERYTIME){this.map.set(cpAddress, {});}
        let decipher = crypto.createDecipheriv(this.AES_ALG, buff, this.iv)
        let data = decipher.update(encrypted,'hex','utf8')
        data += decipher.final('utf8');
        console.log("Successfully decrypted:",data);
        return data;
    }

    async keyExchangeInitReq(cpAddress, cpIP, cpApiPort){
        let self = this;
        return new Promise(function (resolve, reject) {
            let status = self.map.get(cpAddress);
            let alice = crypto.createECDH(self.ECDH_CURVE);
            alice.generateKeys();
            let PK = alice.getPublicKey('hex');
            
            status = {
                "stage": "init",
                "myCrpto": alice,
                "myPK": PK,
            };
            self.map.set(cpAddress, status);

            let data = {
                "stage": "keyExchangeInit",
                "myAddress": self.address,
                "myIP": self.ip,
                "myApiPort": self.apiPort,
                "myPK": PK,
                "TS": Date.now().toString()
            };
            data.hash = crypto.createHash('sha256').update(JSON.stringify(data)+self.salt).copy().digest('hex');

            request({
                method: 'POST',
                uri: "http://" + cpIP + ":" + cpApiPort + "/keyExchangeInit",
                json: true,
                headers: {"content-type": "application/json"},
                body: data
            }, function (error, response, body) {
                if (error) {
                    console.log('--------------------------');
                    console.log('KEY_EXCHANGE_INITIATE_REQ:', error);
                    self.map.set(cpAddress, {});
                    reject(error);
                } else {
                    console.log('--------------------------');
                    console.log('KEY_EXCHANGE_INITIATE_REQ:', data);
                    resolve(body);
                }
            });
        });
    }

    keyExchangeInitRes(cp){
        this.checkHash(cp);
        this.checkTS(cp);
        let status = this.map.get(cp.myAddress);
        let bob = crypto.createECDH(this.ECDH_CURVE);
        bob.generateKeys();
        let PK = bob.getPublicKey('hex');

        status = {
            "stage": "init",
            "myCrpto": bob,
            "myPK": PK,
            "cpPK": cp.myPK,
        };
        this.map.set(cp.myAddress, status);

        let data = {
            "stage": "keyExchangeInit",
            "myAddress": this.address,
            "myIP": this.ip,
            "myApiPort": this.apiPort,
            "myPK": PK,
            "TS": Date.now().toString()
        };
        data.hash = crypto.createHash('sha256').update(JSON.stringify(data)+this.salt).copy().digest('hex');

        console.log("Receive a request for a secure channel");
        console.log('--------------------------');
        console.log('KEY_EXCHANGE_INITIATE_RES:', data);
        return data;
    }

    async keyExchangeFinalReq(cp){
        let self = this;
        return new Promise(function (resolve, reject) {
            let status = self.map.get(cp.myAddress);
            if( !status && status.stage != "init"){throw "stage error";}
            self.checkHash(cp);
            self.checkTS(cp);
            let secret = status.myCrpto.computeSecret(cp.myPK, 'hex', 'hex');
            status["stage"] = "final";
            status["cpPK"] = cp.myPK;
            status["secret"] = secret;
            self.map.set(cp.myAddress, status);

            let data = {
                "stage": "keyExchangeFinal",
                "myAddress": self.address,
                "message": "Successfully generate the session key",
                "TS": Date.now().toString()
            };
            
            request({
                method: 'POST',
                uri: "http://" + cp.myIP + ":" + cp.myApiPort + "/keyExchangeFinal",
                json: true,
                headers: {"content-type": "application/json"},
                body: data
            },
            function (error, response, body) {
                if (error) {
                    console.log('KEY_EXCHANGE_FINALIZE_REQ:', error);
                    self.map.set(cp.myAddress, {});
                    reject(error);
                } else {
                    console.log('KEY_EXCHANGE_FINALIZE_REQ:', data);
                    resolve(body);
                }
            });
        });
    }

    keyExchangeFinalRes(cp){
        let status = this.map.get(cp.myAddress);
        if( !status && status.stage != "init"){throw "stage error";}
        this.checkTS(cp);
        let secret = status.myCrpto.computeSecret(status.cpPK, 'hex', 'hex');
        status["stage"] = "final";
        status["secret"] = secret;
        this.map.set(cp.myAddress, status);

        let data = {
            "stage": "keyExchangeFinal",
            "myAddress": this.address,
            "myIP": this.ip,
            "myApiPort": this.apiPort,
            "message": "Successfully generate the session key",
            "TS": Date.now().toString()
        };
        console.log('KEY_EXCHANGE_FINALIZE_RES:', data);
        return data;
    }

    async keyExchangeChallengeReq(cp){
        let self = this;
        return new Promise(function (resolve, reject) {
            let status = self.map.get(cp.myAddress);
            if( !status && status.stage != "final"){throw "stage error";}
            self.checkTS(cp);
            let challenge = crypto.randomBytes(16).toString('hex');
            let buff = Buffer.from(status.secret, 'hex');
            let cipher = crypto.createCipheriv(self.AES_ALG, buff, self.iv)
            let encrypted = cipher.update(challenge,'utf8','hex')
            encrypted += cipher.final('hex');
            let data = {
                "stage": "keyExchangeChallenge",
                "myAddress": self.address,
                "myIP": self.ip,
                "myApiPort": self.apiPort,
                "encrypted": encrypted,
                "TS": Date.now().toString()
            };
            data.hash = crypto.createHash('sha256').update(JSON.stringify(data)+self.salt).copy().digest('hex');
            
            request({
                method: 'POST',
                uri: "http://" + cp.myIP + ":" + cp.myApiPort + "/keyExchangeChallenge",
                json: true,
                headers: {"content-type": "application/json"},
                body: data
            },
            function (error, response, body) {
                if (error) {
                    console.log('KEY_EXCHANGE_CHALLENGE_REQ:', error);
                    console.log('--------------------------');
                    self.map.set(cp.myAddress, {});
                    reject(error);
                } else {
                    console.log('KEY_EXCHANGE_CHALLENGE_REQ:', data);
                    console.log('Challenge:',challenge);
                    console.log('Response:',body.decrypted);
                    if (challenge === body.decrypted){
                        self.checkTS(body);
                        let status = self.map.get(cp.myAddress);
                        status["stage"] = "ok";
                        status["pov"] = Date.now() + self.POV_TIME;
                        self.map.set(cp.myAddress, status);
                        console.log('Successfully have a secure Channel!');
                        console.log('--------------------------');
                    }
                    resolve(body);
                }
            });
        });
    }

    keyExchangeChallengeRes(cp) {
        let status = this.map.get(cp.myAddress);
        if( !status && status.stage != "final"){throw "stage error";}
        this.checkHash(cp);
        this.checkTS(cp);
        let buff = Buffer.from(status.secret, 'hex');
        let decipher = crypto.createDecipheriv(this.AES_ALG, buff, this.iv)
        let decrypted = decipher.update(cp.encrypted,'hex','utf8')
        decrypted += decipher.final('utf8');

        status["stage"] = "ok";
        status["pov"] = Date.now() + this.POV_TIME;
        this.map.set(cp.myAddress, status);

        let data = {
            "stage": "keyExchangeChallenge",
            "myAddress": this.address,
            "myIP": this.ip,
            "decrypted": decrypted,
            "TS": Date.now().toString()
        };
        console.log("Get Challenge:", cp.encrypted);
        console.log("Decrypted:", decrypted);
        console.log('KEY_EXCHANGE_CHALLENGE_RES:', data)
        console.log('Successfully have a secure Channel!');
        console.log('--------------------------');
        return data;
    }

    async buildSecureChannel(cpAddress, cpIP, cpApiPort){
        let body;
        body = await this.keyExchangeInitReq(cpAddress, cpIP, cpApiPort)
        body = await this.keyExchangeFinalReq(body);
        body = await this.keyExchangeChallengeReq(body);
        return body; 
    }
}

module.exports = SecureChannel;


