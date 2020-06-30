1. node1


	``` shell
	start to listen!
	Express app started: 127.0.0.1
	CareCenter name: CareCenter-One 
	
	Update ip list
	
	IP is allowed
	Call Contract!
	Listen to event successfully!
	Not my job....
	
	Send to contract successfully!
	TX: 0x4607c8dc6db5456946970c423e1ef8b19d955e8ff36bfcfdc17a944089dd6182
	{
	  method: 'Request data',
	  info: {
	    staffName: 'Mark',
	    staffId: '1',
	    patientName: 'Peng',
	    patientId: '9527'
	  },
	  source: 'CareCenter-One',
	  destination: 'Hospital-One',
	  workerNode: '0x281c5cb496a751305b0dd7907320ee55836095c6'
	}
	```

2. node3

	```
	start to listen!
	Express app started: 127.0.0.1
	CareCenter name: CareCenter-BridgeNode-Two 
	
	Update ip list
	Listen to event successfully!
	Get a job
	Relay chain workerNode: 0xb6b724877f84a630a0a9bff1aa4093b1acb37316
	No secure channel, or expired => Build new one
	--------------------------
	KEY_EXCHANGE_INITIATE_REQ: {
	  stage: 'keyExchangeInit',
	  myAddress: '0x281c5cb496a751305b0dd7907320ee55836095c6',
	  myIP: '127.0.0.1',
	  myApiPort: '3003',
	  myPK: '045ce2ed9e55b70ae52f61601ccab711478d357786d99f7aa6cf2f8f088e20bdc6fb2324b0fb50e2b0b21af6978f6485b1decd052fca9dcb890318466e02a4d8e8',
	  TS: '1593525769733',
	  hash: 'cac59d4bbfb43d032509dca99182fd53eb5321364f2abdd8d31bad19b74c9eda'
	}
	Hash correrct
	KEY_EXCHANGE_FINALIZE_REQ: {
	  stage: 'keyExchangeFinal',
	  myAddress: '0x281c5cb496a751305b0dd7907320ee55836095c6',
	  message: 'Successfully generate the session key',
	  TS: '1593525769773'
	}
	KEY_EXCHANGE_CHALLENGE_REQ: {
	  stage: 'keyExchangeChallenge',
	  myAddress: '0x281c5cb496a751305b0dd7907320ee55836095c6',
	  myIP: '127.0.0.1',
	  myApiPort: '3003',
	  encrypted: 'db662fe24a323cbfc439bdc03170528cb8f249675d5a9e7b596f28c0b5787528c67e325a0d481247ed867ed886a35f4b',
	  TS: '1593525769784',
	  hash: '50309ef5f70765ff1503a6bb18a5408cf0e7a1251f9f6ec3e36892b63fd40acc'
	}
	Challenge: 71aab40a72180be77096146d7069f7a3
	Response: 71aab40a72180be77096146d7069f7a3
	Successfully have a secure Channel!
	--------------------------
	Successfully encrypted: cc1601046e1af5064e177afbe0daea9fcbda0f398058d08dfe86c8c6c50222d9f7af2acdcda16b56953a3820219b1d0a33e6d7b1303960b800a10da08656a34df178f7346fd1cdb0f35cd95129a3f7782233163f4770c79aa453227b4ac8193609cd3b5714d790e484a2122955455f11616999d4af4e62e6611e96350cb9cc41eb6d21ad9c222cbde870287293a28664a898abfa100e87feda2e043e03fb4b581f0f90b934858ac9bcf5f086ba5fd6c76517d7039a557618932d3eb1cd91b7b97213ae9b10d3415bd37c12c2de8e4139ad4e6536d66aa07f8e7dbabf0feabdea
	Send to relaychain bridgenode successfully! Server responded with: { message: 'success' } 
	```
	
3. node5

	```
	Express app started: 127.0.0.1
	RelayChain node name: RelayChain-BridgeNode-One 
	
	Update ip list
	
	IP is allowed
	Hash correrct
	Receive a request for a secure channel
	--------------------------
	KEY_EXCHANGE_INITIATE_RES: {
	  stage: 'keyExchangeInit',
	  myAddress: '0xb6b724877f84a630a0a9bff1aa4093b1acb37316',
	  myIP: '127.0.0.1',
	  myApiPort: '3005',
	  myPK: '04f3ccf1eb64030f919c720aafff3b58e46652403b6ff498f626cd6181f143a1a8737ea12150260ecaf97cb86bd277ccb337a0e9707695c229fffa048bc3fd5495',
	  TS: '1593525769762',
	  hash: 'c34b61ad03c5ef140f6fa8751c129f6877acd9807c5333234cd4434abd83447b'
	}
	
	IP is allowed
	KEY_EXCHANGE_FINALIZE_RES: {
	  stage: 'keyExchangeFinal',
	  myAddress: '0xb6b724877f84a630a0a9bff1aa4093b1acb37316',
	  myIP: '127.0.0.1',
	  myApiPort: '3005',
	  message: 'Successfully generate the session key',
	  TS: '1593525769782'
	}
	
	IP is allowed
	Hash correrct
	Get Challenge: db662fe24a323cbfc439bdc03170528cb8f249675d5a9e7b596f28c0b5787528c67e325a0d481247ed867ed886a35f4b
	Decrypted: 71aab40a72180be77096146d7069f7a3
	KEY_EXCHANGE_CHALLENGE_RES: {
	  stage: 'keyExchangeChallenge',
	  myAddress: '0xb6b724877f84a630a0a9bff1aa4093b1acb37316',
	  myIP: '127.0.0.1',
	  decrypted: '71aab40a72180be77096146d7069f7a3',
	  TS: '1593525769786'
	}
	Successfully have a secure Channel!
	--------------------------
	
	IP is allowed
	Successfully decrypted: {"method":"Request data","info":{"staffName":"Mark","staffId":"1","patientName":"Peng","patientId":"9527"},"source":"CareCenter-One","destination":"Hospital-One","workerNode":"0xb6b724877f84a630a0a9bff1aa4093b1acb37316"}
	Call Contract!
	Send to contract to make a record successfully!
	TX:  0x1742724856bc328c31eba247132a914e0717cb513c9fa305806b4c2dc0703785
	{
	  method: 'Request data',
	  info: {
	    staffName: 'Mark',
	    staffId: '1',
	    patientName: 'Peng',
	    patientId: '9527'
	  },
	  source: 'CareCenter-One',
	  destination: 'Hospital-One',
	  workerNode: '0xb6b724877f84a630a0a9bff1aa4093b1acb37316',
	  from: '7545',
	  to: '9545'
	} 
	
	Child chain workerNode: 0x95c0abb132fef71d6351cfde3daecc06b5f14d08
	No secure channel, or expired => Build new one
	--------------------------
	KEY_EXCHANGE_INITIATE_REQ: {
	  stage: 'keyExchangeInit',
	  myAddress: '0xb6b724877f84a630a0a9bff1aa4093b1acb37316',
	  myIP: '127.0.0.1',
	  myApiPort: '3005',
	  myPK: '049fa94f0f4d99245ae06cf5097e19162f1fe6cd0c3558068cfee2d41fd8826b2172834ea11277abbb57f67945f7da33b42a6c99e5954299da0447d6507639638d',
	  TS: '1593525770889',
	  hash: '4434e984a90348600d6f6124a6f7d342e2f7a468c3770727e74b4ff353941d99'
	}
	Hash correrct
	KEY_EXCHANGE_FINALIZE_REQ: {
	  stage: 'keyExchangeFinal',
	  myAddress: '0xb6b724877f84a630a0a9bff1aa4093b1acb37316',
	  message: 'Successfully generate the session key',
	  TS: '1593525770918'
	}
	KEY_EXCHANGE_CHALLENGE_REQ: {
	  stage: 'keyExchangeChallenge',
	  myAddress: '0xb6b724877f84a630a0a9bff1aa4093b1acb37316',
	  myIP: '127.0.0.1',
	  myApiPort: '3005',
	  encrypted: '0178e492690cf09a4c27a7a179bf4fc42c1fb5982b37b97132aa9498556c07cd1e6d25e9b48ed68162c98f3700cf4a3e',
	  TS: '1593525770924',
	  hash: 'cb2f7301a7716b7998ecc1938ba3fdc62a39831663429dfe496259ce27a1c99b'
	}
	Challenge: ca592a37c45c963fce074c201de0f758
	Response: ca592a37c45c963fce074c201de0f758
	Successfully have a secure Channel!
	--------------------------
	Successfully encrypted: 9414ffb73c2995b78613d8f5bac21bc4455cbc96344a11ada6afd05dab2cb8763264839be1ff0d2f20b1442c6d8f5d89ee1c5eb2fafcd7a9225031c597c4530e677728f12e7d3925f343457b04a2665c655910a53f87d9a89fc62a73a65861fa697cc25d5612cb6eb5745b274ede845c7ddbecea3c8df9a0805ef9d4e2b9b3f2ec94701118691b7a6a5994bfdc53448fc8fcb04d67d494df523d45b62f1e4d1ce7a802cdb6c6d9ce95c2c83303ea23de1eb15d34f63e3e9c1d58fb1e9b11dd19fb0171775c3075975d5a3e56c94baf7c706a064d308cb39deffa7dc6097583e2
	Send to chainID:9545 bridgenode successfully! Server responded with: { message: 'success' } 
	```

4. node9

	```
	start to listen!
	Express app started: 127.0.0.1
	Hospital name: Hospital-BridgeNode-One 
	
	Update ip list
	
	IP is allowed
	Hash correrct
	Receive a request for a secure channel
	--------------------------
	KEY_EXCHANGE_INITIATE_RES: {
	  stage: 'keyExchangeInit',
	  myAddress: '0x95c0abb132fef71d6351cfde3daecc06b5f14d08',
	  myIP: '127.0.0.1',
	  myApiPort: '3009',
	  myPK: '04091f028492119ec9e96729e898e8807ac992d82e84c16a75c113d43c77b29f62ce1ce44149667448286731852d7f26701ea8cb98b187af69d757ea5f7ecf0464',
	  TS: '1593525770911',
	  hash: 'c564c469995e3c17f3db3047dcb11585c2101e703863cd8f3af7470941585013'
	}
	
	IP is allowed
	KEY_EXCHANGE_FINALIZE_RES: {
	  stage: 'keyExchangeFinal',
	  myAddress: '0x95c0abb132fef71d6351cfde3daecc06b5f14d08',
	  myIP: '127.0.0.1',
	  myApiPort: '3009',
	  message: 'Successfully generate the session key',
	  TS: '1593525770922'
	}
	
	IP is allowed
	Hash correrct
	Get Challenge: 0178e492690cf09a4c27a7a179bf4fc42c1fb5982b37b97132aa9498556c07cd1e6d25e9b48ed68162c98f3700cf4a3e
	Decrypted: ca592a37c45c963fce074c201de0f758
	KEY_EXCHANGE_CHALLENGE_RES: {
	  stage: 'keyExchangeChallenge',
	  myAddress: '0x95c0abb132fef71d6351cfde3daecc06b5f14d08',
	  myIP: '127.0.0.1',
	  decrypted: 'ca592a37c45c963fce074c201de0f758',
	  TS: '1593525770928'
	}
	Successfully have a secure Channel!
	--------------------------
	
	IP is allowed
	Successfully decrypted: {"method":"Request data","info":{"staffName":"Mark","staffId":"1","patientName":"Peng","patientId":"9527"},"source":"CareCenter-One","destination":"Hospital-One","workerNode":"0x95c0abb132fef71d6351cfde3daecc06b5f14d08"}
	Call Contract!
	Listen to event successfully!
	Not my job....
	Send to contract successfully!
	TX:  0x7a99b49a4f0d6b846c557f40366452482f39532e986716aa94d8b67c258b49ac
	{
	  method: 'Request data',
	  info: {
	    staffName: 'Mark',
	    staffId: '1',
	    patientName: 'Peng',
	    patientId: '9527'
	  },
	  source: 'CareCenter-One',
	  destination: 'Hospital-One'
	} 
	```

5. node12

	```
	start to listen!
	Express app started: 127.0.0.1
	Hospital name: Hospital-One 
	
	Update ip list
	Listen to event successfully!
	Hospital-One ,Finally get it: {
	  method: 'Request data',
	  info: {
	    staffName: 'Mark',
	    staffId: '1',
	    patientName: 'Peng',
	    patientId: '9527'
	  },
	  source: 'CareCenter-One',
	  destination: 'Hospital-One'
	}
	```
