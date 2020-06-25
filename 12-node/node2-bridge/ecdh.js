const express = require('express');
const request = require('request');
const hashMap = require('hashmap');
const crypto = require('crypto');
const bodyParser = require('body-parser');

class SecureChannel {
    constructor(address, ip, everytime = true) {
        this.address = address;
        this.ip = ip;
        this.map = new hashMap();
        /*{
          stage: 'init' -> 'final' -> 'ok'
          myCrpto: my cryptography
          myPK: my public key
          cpPK: counter part public key
          secret: session key
          pov: period of validity
        }*/
        this.ECDH_CURVE = "secp256k1";
        this.AES_ALG = "aes-256-cbc";
        this.hash = crypto.createHash('sha256');
        this.iv = "1234567812345678";
        this.BUILD_SECURE_CHANNEL_EVERYTIME = everytime;

    }

    async checkStatus(cpAddress, cpIP) {
        let body;
        let status = this.map.get(cpAddress);
        if( this.BUILD_SECURE_CHANNEL_EVERYTIME = false &&
            status != undefined && status.pov && status.stage &&
            status.pov > Date.now()  && status.stage == 'ok')
        {
            console.log('--------------------------');
            console.log("Secure channel is open => Challenge");
            body = await this.keyExchangeChallengeReq(cpAddress, cpIP);
        } else {
            console.log("No secure channel, or expired => Build new one");
            body = await this.buildSecureChannel(cpAddress, cpIP);
        }
        return body.message != "fail" ? true : false;
    }

    encrypt (cpAddress, data) {        
        let status = this.map.get(cpAddress);
        let buff = Buffer.from(status.secret, 'hex');
        let cipher = crypto.createCipheriv(this.AES_ALG, buff, this.iv)
        let encrypted = cipher.update(data,'utf8','hex')
        encrypted += cipher.final('hex');
        console.log("Successfully encrypted:",encrypted);
        return encrypted;
    }

    decrypt (cpAddress, encrypted) {
        let status = this.map.get(cpAddress);
        let buff = Buffer.from(status.secret, 'hex');
        let decipher = crypto.createDecipheriv(this.AES_ALG, buff, this.iv)
        let data = decipher.update(encrypted,'hex','utf8')
        data += decipher.final('utf8');
        console.log("Successfully decrypted:",data);
        return data;
    }

    async keyExchangeInitReq(cpAddress, cpIP){
        let self = this;
        return new Promise(function (resolve, reject) {
            let status = self.map.get(cpAddress);
            let alice = crypto.createECDH(self.ECDH_CURVE);
            alice.generateKeys();
            let PK = alice.getPublicKey('hex');
            let TS = Date.now() 

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
                "myPK": PK,
                "TS": TS,
                "Hash": self.hash.update(PK+TS).copy().digest('hex')
            };

            request({
                method: 'POST',
                uri: cpIP + "/keyExchangeInit",
                json: true,
                headers: {"content-type": "application/json"},
                body: data
            }, function (error, response, body) {
                if (error) {
                    console.log('--------------------------');
                    console.log('KEY_EXCHANGE_INITIATE_REQ:', error);
                    reject(error);
                } else {
                    console.log('--------------------------');
                    console.log('KEY_EXCHANGE_INITIATE_REQ:', data);
                    resolve(body);
                }
            });
        });
    }

    keyExchangeInitRes(cpAddress, cpIP, cpPK){
        let status = this.map.get(cpAddress);
        let bob = crypto.createECDH(this.ECDH_CURVE);
        bob.generateKeys();
        let PK = bob.getPublicKey('hex');
        let TS = Date.now();        

        status = {
            "stage": "init",
            "myCrpto": bob,
            "myPK": PK,
            "cpPK": cpPK,
        };
        this.map.set(cpAddress, status);

        let data = {
            "stage": "keyExchangeInit",
            "myAddress": this.address,
            "myIP": this.ip,
            "myPK": PK,
            "TS": TS,
            "Hash": this.hash.update(PK+TS).copy().digest('hex')
        };
        console.log("Receive a request for a secure channel");
        console.log('--------------------------');
        console.log('KEY_EXCHANGE_INITIATE_RES:', data);
        return data;
    }

    async keyExchangeFinalReq(cpAddress, cpIP, cpPK){
        let self = this;
        return new Promise(function (resolve, reject) {
            let status = self.map.get(cpAddress);
            let secret = status.myCrpto.computeSecret(cpPK, 'hex', 'hex');
            status["stage"] = "final";
            status["cpPK"] = cpPK;
            status["secret"] = secret;
            self.map.set(cpAddress, status);
            console.log(secret,"keylen",secret)

            let data = {
                "stage": "keyExchangeFinal",
                "myAddress": self.address,
                "message": "Successfully generate the session key"
            };
            
            request({
                method: 'POST',
                uri: cpIP+"/keyExchangeFinal",
                json: true,
                headers: {"content-type": "application/json"},
                body: data
            },
            function (error, response, body) {
                if (error) {
                    console.log('\nKEY_EXCHANGE_FINALIZE_REQ:', error);
                    reject(erroo);
                } else {
                    console.log('\nKEY_EXCHANGE_FINALIZE_REQ:', data);
                    resolve(body);
                }
            });
        });
    }

    keyExchangeFinalRes(cpAddress, cpIP){
        let status = this.map.get(cpAddress);
        let secret = status.myCrpto.computeSecret(status.cpPK, 'hex', 'hex');
        status["stage"] = "final";
        status["secret"] = secret;
        this.map.set(cpAddress, status);

        let data = {
            "stage": "keyExchangeFinal",
            "myAddress": this.address,
            "myIP": this.ip,
            "message": "Successfully generate the session key"
        };
        console.log('\nKEY_EXCHANGE_FINALIZE_RES:', data);
        return data;
    }

    async keyExchangeChallengeReq(cpAddress, cpIP){
        let self = this;
        return new Promise(function (resolve, reject) {
            let challenge = crypto.randomBytes(16).toString('hex');
            let TS = Date.now() 
            let status = self.map.get(cpAddress);
            let buff = Buffer.from(status.secret, 'hex');
            let cipher = crypto.createCipheriv(self.AES_ALG, buff, self.iv)
            let encrypted = cipher.update(challenge+TS,'utf8','hex')
            encrypted += cipher.final('hex');
            let data = {
                "stage": "keyExchangeChallenge",
                "myAddress": self.address,
                "myIP": self.ip,
                "encrypted": encrypted
            };
            
            request({
                method: 'POST',
                uri: cpIP+"/keyExchangeChallenge",
                json: true,
                headers: {"content-type": "application/json"},
                body: data
            },
            function (error, response, body) {
                if (error) {
                    console.log('\nKEY_EXCHANGE_CHALLENGE_REQ:', error);
                    console.log('--------------------------');
                    reject(error);
                } else {
                    console.log('\nKEY_EXCHANGE_CHALLENGE_REQ:', data);
                    console.log('Challenge:',challenge);
                    console.log('Response:',body.decrypted);
                    if (challenge === body.decrypted){
                        let status = self.map.get(cpAddress);
                        status["stage"] = "ok";
                        status["pov"] = Date.now() + 60*60*1000; // 1 hour
                        self.map.set(cpAddress, status);
                        console.log('Successfully have a secure Channel!');
                        console.log('--------------------------');
                    }
                    resolve(body);
                }
            });
        });
    }

    keyExchangeChallengeRes(cpAddress, cpIP, encrypted) {
        let status = this.map.get(cpAddress);
        let buff = Buffer.from(status.secret, 'hex');
        let decipher = crypto.createDecipheriv(this.AES_ALG, buff, this.iv)
        let decrypted = decipher.update(encrypted,'hex','utf8')
        decrypted += decipher.final('utf8');
        let challenge = decrypted.substring(0,32);
        let TS = decrypted.substring(32);
        let data = {};
        
        if (parseInt(TS) && parseInt(TS)+5000 > Date.now()){
            let status = this.map.get(cpAddress);
            status["stage"] = "ok";
            status["pov"] = Date.now() + 60*60*1000; //1 hour
            this.map.set(cpAddress, status);

            data = {
                "stage": "keyExchangeChallenge",
                "myAddress": this.address,
                "myIP": this.ip,
                "decrypted": challenge
            };
            console.log("\nGet Challenge:", encrypted);
            console.log("Decrypted:", challenge, "-", TS);
            console.log('KEY_EXCHANGE_CHALLENGE_RES:', data)
            console.log('Successfully have a secure Channel!');
            console.log('--------------------------');
        }
        return data;
    }

    async buildSecureChannel(cpAddress, cpIP){
        let body;
        body = await this.keyExchangeInitReq(cpAddress, cpIP)
        body = await this.keyExchangeFinalReq(body.myAddress, body.myIP, body.myPK);
        body = await this.keyExchangeChallengeReq(body.myAddress, body.myIP);
        return body;
    }
}

module.exports = SecureChannel;


