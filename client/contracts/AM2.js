
/*
This file is for research only. the official file is in a production build.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const crypto = require('crypto')
const { ethers } = require("ethers")
const fetch = require("node-fetch");
const e = require('express');

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient()
let tablename = "cpl-database-dev"; //wallet storage

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// plugin for eth account (do verification on our side)
const getContract = (signer, abi, address) => {
  // get the end user
  console.log(signer)
  // get the smart contract
  const contract = new ethers.Contract(address, abi, signer);
  return contract
}

const ddsAddress = "0x79915E0af8c4DeC83c5c628b2a050B7062D7bC1d";
const creditAddress = "0xc183177E3207788ea9342255C8Fcb218763d46e2";
const ddsABI = [];
const creditABI = [];


const provider = new ethers.providers.InfuraProvider("goerli")
//encrypt wallet using: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SecretsManager.html
let ConnectedWallet = []
let params = {
	TableName: tablename,
	Key: {
	  id: 0
	}
}

dynamodb.get(params, (error, result) => {
	if (error) {
	  console.log(error)
	  //res.json({ statusCode: 500, error: error.message })
	} else {
	  if(result.Item) {
		let NewWallet = new ethers.Wallet(result.Item.pk, provider)
		ConnectedWallet.push(NewWallet);
		console.log("accessed")
	  } else {
		console.log("not accessed")
		let NewWallet = ethers.Wallet.createRandom()
		ConnectedWallet.push(NewWallet.connect(provider));
		let create_params = {
		  TableName: tablename,
		  Item: {
			id: 0,
			pk: NewWallet.privateKey.toString()
		  }
		}

		dynamodb.put(create_params, (error, result) => {
		  if (error) {
			res.json({error: error.message});
		  } else {
			console.log(result);
		}})
	  }
	}
})

async function load_wallet() {

	dynamodb.get(params, (error, result) => {
		if (error) {
		console.log(error)
		//res.json({ statusCode: 500, error: error.message })
		} else {
		if(result.Item) {
			let NewWallet = new ethers.Wallet(result.Item.pk, provider)
			//ConnectedWallet.push(NewWallet);
			ConnectedWallet[0] = NewWallet
			//console.log("accessed")
		} else {
			console.log("not accessed")
			let NewWallet = ethers.Wallet.createRandom()
			//ConnectedWallet.push(NewWallet.connect(provider));
			let create_params = {
				TableName: tablename,
				Item: {
					id: 0,
					pk: NewWallet.privateKey.toString()
				}
			}

			dynamodb.put(create_params, (error, result) => {
			if (error) {
				ConnectedWallet[0] = NewWallet.connect(provider)
			} else {
				console.log(result);
				ConnectedWallet[0] = NewWallet.connect(provider)
			}})
		}
		}
	})
}


//using: /getOracleAddr, we can get the wallet address, then 

// use singMessage function to compare signature
async function validate(address, amount) {
  //have some kind of event that we can dynamicly push to create a public ledger
	if (ConnectedWallet[0]) {
		let credits = getContract(ConnectedWallet[0], creditABI, creditAddress);
		const balance = credits.balanceOf(address);
		if (amount*100000 <= balance){
			await credits._brun(address, amount*100000);
			return true; //remove penalities
		} else {
			return false;
		}
	} else {
		await load_wallet()
		let credits = getContract(ConnectedWallet[0], creditABI, creditAddress);
		const balance = credits.balanceOf(address);
		if (amount*100000 <= balance){
			await credits._brun(address, amount*100000);
			return true; //remove penalities
		} else {
			return false;
		}
	}
}

app.get("/getOracleAddr", async (req, res) => {
  //await load_wallet();
  if (ConnectedWallet[0]) {
  	res.json({"pk": ConnectedWallet[0].privateKey, "address": ConnectedWallet[0].address}); //replace by address
  } else {
	await load_wallet();
	res.json({"pk": ConnectedWallet[0].privateKey, "address": ConnectedWallet[0].address});
  } 
})

// plugin for payment

const CLIENT_ID ="" 
const APP_SECRET = ""

const baseURL = {
    sandbox: "",
    production: ""
};


// create a new order
app.post("/create-order", async (req, res) => {
  const order = await createOrder(req.body.amount);
  res.json(order);
});

// capture payment & store order information or fullfill order
app.post("/capture-order", async (req, res) => {
  const captureData = await capturePayment(req.body.orderID, req.body.address, req.body.amount, req.body.itemId, req.body.key, req.body.buying);
  // TODO: store payment information such as the transaction ID orderId, address, amount, itemId, key, buying
  if (captureData) {
	res.json(captureData);
} else {
	res.json({"status": 50})
}
});

app.post("/get-payed", async (req, res) => {
  const captureData = await getPayed(req.body.amount, req.body.email, req.body.address, req.body.id, req.body.proof);
  // TODO: store payment information such as the transaction ID
  if (captureData) {
	res.json(captureData);
} else {
	res.json({"status": 40})
}
});

app.post("/get-refund", async (req, res) => {
	const captureData = await getRefund(req.body.id, req.body.email);
	// TODO: store payment information such as the transaction ID
	if (captureData) {
		res.json(captureData);
	} else {
		res.json({"status": 30})
	}
	
  });

app.post("/oracleMint", async (req, res) => {
	const itemCount = await mintList(req.body.address, req.body.uri, req.body.MaxPrice, req.body.numDays); 
	// TODO: store payment information such as the transaction ID
	if (itemCount) {
		res.send(itemCount);
	} else {
		res.json({"status": 10})
	}
	
});

app.post("/oracleMultiMint", async (req, res) => {
	const itemCount = await multipleMintList(req.body.address, req.body.uri, req.body.MaxPrice, req.body.numDays);
	// TODO: store payment information such as the transaction ID
	if (itemCount) {
		res.send(itemCount);
	} else {
		res.json({"status": 20})
	}
}); //deleteItem(uint _itemId)

app.post("/deleteItem", async (req, res) => {
	const confirmation = await deleteItem(req.body.owner, req.body.itemId);
	// TODO: store payment information such as the transaction ID
	if (confirmation) {
		res.send("success");
	} else {
		res.json({"status": 60})
	}
});


//////////////////////
// PayPal API helpers
//////////////////////

// use the orders api to create an order
//ad more params: https://developer.paypal.com/docs/api/orders/v2/#orders_create
async function createOrder(amount) {
  const accessToken = await generateAccessToken();
  //console.log(accessToken)
  const url = `${baseURL.production}/v2/checkout/orders`;
  //console.log(url)
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "CAD",
            value: amount,
          },
        },
      ],
    }),
  });
  const data = await response.json();

  return data;
}


async function getRefund(id, email) {
	const accessToken = await generateAccessToken();
	//console.log(accessToken)
	const amount = await refundCredits(id)
	const url = `${baseURL.production}/v1/payments/payouts`;
	//const validated = await validate(address, amount);
	//console.log(validated)
	if (amount) {
			let transactionID = crypto.randomUUID();

		  const response = await fetch(url, {
		  method: 'POST',
		  headers: {
			  'Content-Type': 'application/json',
			  Authorization: `Bearer ${accessToken}`,
		  },
		  body: JSON.stringify({
			  "sender_batch_header": { 
			  "sender_batch_id": transactionID, 
			  "recipient_type": "EMAIL",
			  "email_subject": "You have a payout!", 
			  "email_message": "You have received a payout! Thanks for using our service!" 
			  }, "items": [ 
			  { 
				  "recipient_type": "EMAIL", 
				  "amount": {
				  "value": (amount/100000).toFixed(2).toString(), //amount
				  "currency": "CAD", 
				  }, "note": "Powered by Atelier de Simon", 
				  "recipient_wallet": "PAYPAL",
				  "receiver": email //email
				  
			  } 
			  ] 
		  })
	  });
		  const data = await response.json();
		  
		  return data;
	  } else {
		  return false;
	  }

}



async function getPayed(amount, email, address, id, proof) {
  const accessToken = await generateAccessToken();
  //console.log(accessToken)
  const validation = await proofAndGo(address, id, proof)
  const url = `${baseURL.production}/v1/payments/payouts`;
  //const validated = await validate(address, amount);
  //console.log(validated)
  /* { 
				"recipient_type": "EMAIL", 
				"amount": {
				"value": feeamount, //amount *0.15
				"currency": "CAD", 
				}, "note": "Powered by Imperial Technologies", 
				"recipient_wallet": "PAYPAL",
				"receiver": "hbaril1@icloud.com" //email
				
			}*/
  if (validation) {
	    let transactionID = crypto.randomUUID();
		const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			"sender_batch_header": { 
			"sender_batch_id": transactionID,
			"recipient_type": "EMAIL",
			"email_subject": "You have a payout!", 
			"email_message": "You have received a payout! Thanks for using our service!" 
			}, "items": [ 
			{ 
				"recipient_type": "EMAIL", 
				"amount": {
				"value": amount, //amount
				"currency": "CAD", 
				}, "note": "Powered by Atelier de Simon", 
				"recipient_wallet": "PAYPAL",
				"receiver": email //email
				
			}
			] 
		})
	});
		const data = await response.json();
		
		return data;
	} else {
		return false;
	}
  

}

// use the orders api to capture payment for an order
// this triggers when payment is approved 
async function capturePayment(orderId, address, amount, itemId, key, buying) {
  const accessToken = await generateAccessToken();
  const url = `${baseURL.production}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();

  if (buying) {
	let bool = await mintBuy(address, amount, itemId, key )
	if (bool) {
		return data
	} else {
		return false 
	}
  } else {
	return data;
  }

 
}

////////////////////////
// DDS Contract helpers
//////////////////////

//mint directly to contract 
// url: /oracleMint
async function mintList(address, uri, price, numDays) {
	if (ConnectedWallet[0]) {
		const dds = getContract(ConnectedWallet[0], ddsABI, ddsAddress);
		console.log(parseInt(price*100000))
		//console.log(address)
		//console.log(uri)
		//console.log(numDays)
		//console.log(dds)
		try {
			await dds.mintList(address, uri, parseInt(price*100000), numDays); //max price mintList(address,string,uint256,uint256)
			//console.log(itemCount)
			let realitemcount = await dds.itemCount()
			return realitemcount;
		} catch (e) {
			console.log(e)
			return false;
		}
		
	} else {
		await load_wallet()
		//console.log(price*100000)
		const dds = getContract(ConnectedWallet[0], ddsABI, ddsAddress);
		try {
			await dds.mintList(address, uri, parseInt(price*100000), numDays); //max price mintList(address,string,uint256,uint256)
			//console.log(itemCount)
			let realitemcount = await dds.itemCount()
			return realitemcount;
		} catch (e) {
			console.log(e)
			return false;
		}
	}
}

//multiMint directly to contract 
//url: /oracleMutliMint
async function multipleMintList(address, uri, price, numDays) {
	if (ConnectedWallet[0]) {
		
		for (let i =0; i < price?.length; i++) {
			price[i] = parseInt(price[i] *100000) //maxprice
		}
		const dds = getContract(ConnectedWallet[0], ddsABI, ddsAddress);
		try {
			let itemCount = await dds.multipleMintList(address, uri, price, numDays);
			return itemCount;
		} catch (e) {
			console.log(e);
			return false;
		}
		
	} else {
		await load_wallet()
		console.log(ConnectedWallet[0])
		for (let i =0; i < price?.length; i++) {
			price[i] = price[i] *100000
		}
		const dds = getContract(ConnectedWallet[0], ddsABI, ddsAddress);
		try {
			let itemCount = await dds.multipleMintList(address, uri, price, numDays);
			return itemCount;
		} catch (e) {
			console.log(e);
			return false;
		}
	}
}
//delete an item (only sellers)
async function deleteItem(address, itemId) {
	if (ConnectedWallet[0]) {
		const dds = getContract(ConnectedWallet[0], ddsABI, ddsAddress);
		try {
			await dds.deleteItemPool(address, itemId); //transfer the item to the oracle and removes it from the market
			return true;
		} catch (e) {
			console.log(e);
			return false;
		}
		
	} else {
		await load_wallet()
		const dds = getContract(ConnectedWallet[0], ddsABI, ddsAddress);
		try {
			await dds.deleteItemPool(address, itemId); //transfer the item to the oracle and removes it from the market
			return true;
		} catch (e) {
			console.log(e);
			return false;
		}
	}
}

//mint -> maxprice
async function mintBuy(address, amount, itemId, key) {
	if (ConnectedWallet[0]) {
		const dds = getContract(ConnectedWallet[0], ddsABI, ddsAddress);
		const credits = getContract(ConnectedWallet[0], creditABI, creditAddress);
		//console.log(amount)
		try {
			await (await credits._mint(ddsAddress, parseInt(amount * 100000))).wait();
			await dds.mintBuy(address, itemId, itemId, key);
			return true;
		
		} catch (e) {
			console.log(e);
			return false;
		}
		
	} else {
		await load_wallet()
		const dds = getContract(ConnectedWallet[0], ddsABI, ddsAddress);
		const credits = getContract(ConnectedWallet[0], creditABI, creditAddress);

		try {
			await await (await credits._mint(ddsAddress, parseInt(amount * 100000))).wait();
			await dds.mintBuy(address, itemId, itemId, key);
			return true;
		
		} catch (e) {
			console.log(e);
			return false;
		}
	}
}

async function refundCredits(id) {
	//retrieveCredit(uint256 _itemId)
	if (ConnectedWallet[0]) {
		const dds = getContract(ConnectedWallet[0], ddsABI, ddsAddress);
		try {
			const amount = await (await dds.retrieveCredit(id)).wait();
			return amount;
		} catch (e) {
			return false;
		}
		
		
		
	} else {
		await load_wallet()
		const dds = getContract(ConnectedWallet[0], ddsABI, ddsAddress);
		try {
			const amount = await (await dds.retrieveCredit(id)).wait();
			return amount;
		} catch (e) {
			return false;
		}
	}

}

async function proofAndGo(address, id, proof) {
	if (ConnectedWallet[0]) {
		const dds = getContract(ConnectedWallet[0], ddsABI, ddsAddress);
		try {
			await dds.submitProofPool(address, id, proof);
			return true;
		} catch (e) {
			return false;
		}
			
	} else {
		await load_wallet()
		const dds = getContract(ConnectedWallet[0], ddsABI, ddsAddress);
		try {
			await dds.submitProofPool(address, id, proof);
			return true;
		} catch (e) {
			return false;
		}
	}
}

// generate an access token using client id and app secret
async function generateAccessToken() {
  const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64")
  const response = await fetch(`${baseURL.production}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const data = await response.json();
  return data.access_token;
}


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
