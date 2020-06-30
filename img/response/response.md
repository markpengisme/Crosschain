1. node12

	```
	start to listen!
	Express app started: 127.0.0.1
	Hospital name: Hospital-One 
	
	Update ip list
	
	IP is allowed
	Call Contract!
	Listen to event successfully!
	Not my job....
	
	Send to contract successfully!
	TX: 0x77ed92fae3add49c0dd2d60676df4b9868e6fb9d902af2b7e6fa1a26f671403b
	{
	  method: 'Response data',
	  info: {
	    staffName: 'Mark',
	    staffId: '1',
	    patientName: 'Peng',
	    patientId: '9527',
	    Health: 'Good'
	  },
	  source: 'Hospital-One',
	  destination: 'CareCenter-One',
	  workerNode: '0xfe98d6e761e11e9752b08c655910256899bf366a'
	}
	```

2. node10

	```
	start to listen!
	Express app started: 127.0.0.1
	Hospital name: Hospital-BridgeNode-Two 
	
	Update ip list
	Listen to event successfully!
	Get a job
	Relay chain workerNode: 0x89326c9b03e4ebee6fadcad18c8e98a4e7033f8c
	No secure channel, or expired => Build new one
	--------------------------
	KEY_EXCHANGE_INITIATE_REQ: {
	  stage: 'keyExchangeInit',
	  myAddress: '0xfe98d6e761e11e9752b08c655910256899bf366a',
	  myIP: '127.0.0.1',
	  myApiPort: '3010',
	  myPK: '044ade00f9d944c0ab3a77a4c12e17d3c9cd301db39f8a974fc597e3812ab28eb94eab7e6d10a9c8f01c7045c7b66c535c5731e77b7374d64005d41c46cc63e6f8',
	  TS: '1593526550147',
	  hash: '19c07003e2c9db54e7ea6d358eac2dd21bae678b81cec57ff69ba2f31e6083e7'
	}
	Hash correrct
	KEY_EXCHANGE_FINALIZE_REQ: {
	  stage: 'keyExchangeFinal',
	  myAddress: '0xfe98d6e761e11e9752b08c655910256899bf366a',
	  message: 'Successfully generate the session key',
	  TS: '1593526550314'
	}
	KEY_EXCHANGE_CHALLENGE_REQ: {
	  stage: 'keyExchangeChallenge',
	  myAddress: '0xfe98d6e761e11e9752b08c655910256899bf366a',
	  myIP: '127.0.0.1',
	  myApiPort: '3010',
	  encrypted: 'fab67d87573a5e4e81ac1d0104bac8acb5b8f121315868c5d856f67b6d750452dedb1bd2d5f8e288fc987660ca347b18',
	  TS: '1593526550325',
	  hash: 'ed1292314b4096172b7d5d8cd9706fa1775e93a1a8cc991eab3d68c8704947c7'
	}
	Challenge: 36982d600eac0dc09429486578b7f288
	Response: 36982d600eac0dc09429486578b7f288
	Successfully have a secure Channel!
	--------------------------
	Successfully encrypted: 280b54d3f45e5e06425aa154f8cbe7c3a2facbbb9a79a0bc37c17cde54617d57dc79c9494599717b49564a0c5eb18a4884e06d7a943dc7e2a9b6f93067d219b7d88e9b3730b189c6a927363fd7a7ede758b72d2bc417d302e1bdfcc60445c2c6b6181bf962549f80533c5d8a8b47076afaec46175d3c32a1830e675884f1e9f6db17e30917198f6d04f904a3e4f97d39d455f3388f8cae49dae2ef8f89b3f0e8fbf9b174a93ad8941a3c35f31bd3f93c122d9d2290446098d5dc87993c86760dba95063598824956b4ca3cf4db1d69273fdfef0ed012509d359b41359079e1c4f3e52879052ac00cf45f78297a427c6b
	Send to relaychain bridgenode successfully! Server responded with: { message: 'success' } 
	```

3. node7

	```
	Express app started: 127.0.0.1
	RelayChain node name: RelayChain-BridgeNode-Three 
	
	Update ip list
	
	IP is allowed
	Hash correrct
	Receive a request for a secure channel
	--------------------------
	KEY_EXCHANGE_INITIATE_RES: {
	  stage: 'keyExchangeInit',
	  myAddress: '0x89326c9b03e4ebee6fadcad18c8e98a4e7033f8c',
	  myIP: '127.0.0.1',
	  myApiPort: '3007',
	  myPK: '04d8dbf9b27ddbe5739eeb24aac24d67cc874e7bb13b3f41b95b99d3b2fa34f6cb6766bee0e334afe7019fa7a99cbe5600c29f7433ba66768d0d84a0d0d08630c8',
	  TS: '1593526550302',
	  hash: 'fc73648bc1ce1dcaf9953b10088b9fa84e6c5c3ebfd25bcde630783bcd73d67c'
	}
	
	IP is allowed
	KEY_EXCHANGE_FINALIZE_RES: {
	  stage: 'keyExchangeFinal',
	  myAddress: '0x89326c9b03e4ebee6fadcad18c8e98a4e7033f8c',
	  myIP: '127.0.0.1',
	  myApiPort: '3007',
	  message: 'Successfully generate the session key',
	  TS: '1593526550321'
	}
	
	IP is allowed
	Hash correrct
	Get Challenge: fab67d87573a5e4e81ac1d0104bac8acb5b8f121315868c5d856f67b6d750452dedb1bd2d5f8e288fc987660ca347b18
	Decrypted: 36982d600eac0dc09429486578b7f288
	KEY_EXCHANGE_CHALLENGE_RES: {
	  stage: 'keyExchangeChallenge',
	  myAddress: '0x89326c9b03e4ebee6fadcad18c8e98a4e7033f8c',
	  myIP: '127.0.0.1',
	  decrypted: '36982d600eac0dc09429486578b7f288',
	  TS: '1593526550328'
	}
	Successfully have a secure Channel!
	--------------------------
	
	IP is allowed
	Successfully decrypted: {"method":"Response data","info":{"staffName":"Mark","staffId":"1","patientName":"Peng","patientId":"9527","Health":"Good"},"source":"Hospital-One","destination":"CareCenter-One","workerNode":"0x89326c9b03e4ebee6fadcad18c8e98a4e7033f8c"}
	Call Contract!
	Send to contract to make a record successfully!
	TX:  0x90dfaa3fc41f4a2ae9ab1e453a3ba947c24203205415e7db751aa760b027a2d0
	{
	  method: 'Response data',
	  info: {
	    staffName: 'Mark',
	    staffId: '1',
	    patientName: 'Peng',
	    patientId: '9527',
	    Health: 'Good'
	  },
	  source: 'Hospital-One',
	  destination: 'CareCenter-One',
	  workerNode: '0x89326c9b03e4ebee6fadcad18c8e98a4e7033f8c',
	  from: '9545',
	  to: '7545'
	} 
	
	Child chain workerNode: 0x281c5cb496a751305b0dd7907320ee55836095c6
	No secure channel, or expired => Build new one
	--------------------------
	KEY_EXCHANGE_INITIATE_REQ: {
	  stage: 'keyExchangeInit',
	  myAddress: '0x89326c9b03e4ebee6fadcad18c8e98a4e7033f8c',
	  myIP: '127.0.0.1',
	  myApiPort: '3007',
	  myPK: '0422ace50033850f51c97ee16a8a6c99a1b3ca680ea5ad91ca265478b717ae2871e2c550079756bdf5b02b6fd73bbc62f06d73469402ea95c3d3ac1c6e9ac5e091',
	  TS: '1593526551390',
	  hash: 'f3c52fba14cf0a41cb235058a520ae1d29e608e4d425de7e727e9f6782a9dd61'
	}
	Hash correrct
	KEY_EXCHANGE_FINALIZE_REQ: {
	  stage: 'keyExchangeFinal',
	  myAddress: '0x89326c9b03e4ebee6fadcad18c8e98a4e7033f8c',
	  message: 'Successfully generate the session key',
	  TS: '1593526551436'
	}
	KEY_EXCHANGE_CHALLENGE_REQ: {
	  stage: 'keyExchangeChallenge',
	  myAddress: '0x89326c9b03e4ebee6fadcad18c8e98a4e7033f8c',
	  myIP: '127.0.0.1',
	  myApiPort: '3007',
	  encrypted: '491f585c797e0ad2696696a488fd9ff2f5274b97a2590b853bd4a93d69ed93d41e36aa7e46f7383f6b1183e781a16019',
	  TS: '1593526551443',
	  hash: '59365c5358a26f6b0db5684495351edd41b0edd2cc907587a2081a54d791c708'
	}
	Challenge: 3f417bb0389c318da87305ed6be1674b
	Response: 3f417bb0389c318da87305ed6be1674b
	Successfully have a secure Channel!
	--------------------------
	Successfully encrypted: 313be1e373a6c4573420dfabd4398081994ca20c9a93c3f98d5b77125c001b5845b47ed3002ce59fbc176f93821b4029de65d1dd26d1eb5d130964877349e8d181618647c8c50b21e96f28b18a8005ef7c4d06916a958d40438c08f52a591d01c7da9e041a589bcd75440c346295ea8bb8f9a163fd7d6d288084cae389c209b848ae5fd2cbe6e4eacb3d243585141c09507f03e4e82c288bbff67f43842a36f26c9881c1c050e035f080e435372dba29666a3bf0342c68faba211162b57b3c13a45a134ab58c243c844ca50d446c943f294de43898dc2fd3fbf5f94121d0b35b232938ffb6318730883b79bb79371261
	Send to chainID:7545 bridgenode successfully! Server responded with: { message: 'success' } 
	```

4. node3

	```
	start to listen!
	Express app started: 127.0.0.1
	CareCenter name: CareCenter-BridgeNode-Two 
	
	Update ip list
	
	IP is allowed
	Hash correrct
	Receive a request for a secure channel
	--------------------------
	KEY_EXCHANGE_INITIATE_RES: {
	  stage: 'keyExchangeInit',
	  myAddress: '0x281c5cb496a751305b0dd7907320ee55836095c6',
	  myIP: '127.0.0.1',
	  myApiPort: '3003',
	  myPK: '040750cc1758f77a855924441354c435d0353fecd5f51314e4dee41e090e01d81fd53e727f93c71cf5a5a63dd0a2668cc1a0ebaf48268ab0e628d35fdcf55ba4ea',
	  TS: '1593526551425',
	  hash: 'b92305dc6b70adb54224eb803e9c6a0d130396df603945b891ebb30a3b15b23e'
	}
	
	IP is allowed
	KEY_EXCHANGE_FINALIZE_RES: {
	  stage: 'keyExchangeFinal',
	  myAddress: '0x281c5cb496a751305b0dd7907320ee55836095c6',
	  myIP: '127.0.0.1',
	  myApiPort: '3003',
	  message: 'Successfully generate the session key',
	  TS: '1593526551441'
	}
	
	IP is allowed
	Hash correrct
	Get Challenge: 491f585c797e0ad2696696a488fd9ff2f5274b97a2590b853bd4a93d69ed93d41e36aa7e46f7383f6b1183e781a16019
	Decrypted: 3f417bb0389c318da87305ed6be1674b
	KEY_EXCHANGE_CHALLENGE_RES: {
	  stage: 'keyExchangeChallenge',
	  myAddress: '0x281c5cb496a751305b0dd7907320ee55836095c6',
	  myIP: '127.0.0.1',
	  decrypted: '3f417bb0389c318da87305ed6be1674b',
	  TS: '1593526551447'
	}
	Successfully have a secure Channel!
	--------------------------
	
	IP is allowed
	Successfully decrypted: {"method":"Response data","info":{"staffName":"Mark","staffId":"1","patientName":"Peng","patientId":"9527","Health":"Good"},"source":"Hospital-One","destination":"CareCenter-One","workerNode":"0x281c5cb496a751305b0dd7907320ee55836095c6"}
	Call Contract!
	Listen to event successfully!
	Not my job....
	Send to contract successfully!
	TX:  0x74c75f9158caf504785713dcea9e996f4f4db096fda73314409b4074b9895ce8
	{
	  method: 'Response data',
	  info: {
	    staffName: 'Mark',
	    staffId: '1',
	    patientName: 'Peng',
	    patientId: '9527',
	    Health: 'Good'
	  },
	  source: 'Hospital-One',
	  destination: 'CareCenter-One'
	} 
	```


5. node1

	```
	start to listen!
	Express app started: 127.0.0.1
	CareCenter name: CareCenter-One 
	
	Update ip list
	Listen to event successfully!
	CareCenter-One ,Finally get it: {
	  method: 'Response data',
	  info: {
	    staffName: 'Mark',
	    staffId: '1',
	    patientName: 'Peng',
	    patientId: '9527',
	    Health: 'Good'
	  },
	  source: 'Hospital-One',
	  destination: 'CareCenter-One'
	}
	```
