/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
//const fs = require("fs");
const busboy = require('connect-busboy');
//const database = require("./database.json");
//const pricedata = require("./price.json"); //10dayPrice - pricedata
//const Moralis = require("moralis-v1/node"); // /node in v1
const Moralis = require("moralis").default; // new moralis v2

const EvmChain = require('@moralisweb3/evm-utils').EvmChain

const AWS = require('aws-sdk');
//const schedule = require('node-schedule');

/* Moralis information to start server (hide at release) */
/*
const serverUrl = "https://a7p1zeaqvdrv.usemoralis.com:2053/server";
const appId = "N4rINlnVecuzRFow0ONUpOWeSXDQwuErGQYikyte";
const masterKey = "ctP77IRXmuuWvPaubv7OZVvMNk4M9lmbZoqX7heB";
*/
const apiKey = "tKVCOpsbUvvxuQwoNY4OoF7HSPmmRdKIrU6DkHv03qA5uX2m2TfZPLSfAIz5hrcH" // migration to moralis v2
const chain = EvmChain.ETHEREUM;
const dynamodb = new AWS.DynamoDB.DocumentClient()
let priceName = "pricedata-dev"
let tableName = "pricedata2-dev";
let ItemName = "itemdb-dev"
// helper function for Moralis api

//get a token live price
async function getLivePrice() {
  await Moralis.start({ apiKey: apiKey, });

  const options = {
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    chain: chain,
  };
  
  const price = await Moralis.EvmApi.token.getTokenPrice(options);
  return price
}


//get a list of all user's transactions
async function getTransList(address) {
  await Moralis.start({ apiKey: apiKey, });


  const options = {
    address: address,
    from_block: "0",
  };
  const transfers = await Moralis.EvmApi.token.getTokenTransfers(options);
  return transfers
}


//get block number (historical)
const fetchDateToPrice = async (somedate, price) => {
  await Moralis.start({ apiKey: apiKey, });
  const options = { chain: chain, date: somedate};
  const date = await Moralis.EvmApi.block.getDateToBlock(options);
  price = await hitoricalFetchPrice(date["block"], price)
  return price
};


//get the price for a particular block
const hitoricalFetchPrice = async (block, price) => {
  await Moralis.start({ apiKey: apiKey, });
  const options = {
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      chain: chain,
      to_block: block

  };
  const tokenprice = await Moralis.EvmApi.token.getTokenPrice(options);
  price.push(tokenprice["usdPrice"])
  return price
};


//function to get the price for the past X days
async function getInfofordays(numdays) {
  await Moralis.start({ apiKey: apiKey, });
  var price = []

  const getfordays = async (numdays) => {
    let date0 = new Date();
    let date1 = new Date(date0)
    for (let i = 0; i < numdays; i++) {
        date1.setDate(date1.getDate() - 1)
        
        price = await fetchDateToPrice(date1, price)
    }
  
  }

  await getfordays(numdays);
  return price
}


//save information to json database
function saveInfo(price, mesure) {
  const params = {
    TableName: priceName,
    Key: {
      id: 0, //val
    },
    ExpressionAttributeNames: { '#price10day': 'price10day' },
    ExpressionAttributeValues: {},
    ReturnValues: 'UPDATED_NEW',
  };
  params.UpdateExpression = 'SET '
  params.ExpressionAttributeValues[':price10day'] = price;
  params.UpdateExpression += '#price10day = :price10day, ';
  try {
    dynamodb.update(params, (error, result) => {
      if (error) {
        console.log(error.message);
      }
      else {
        return result
      }
    });
  } catch (error) {
    return error
  }
  

  /*
  if(mesure == 10) {
    pricedata[0].price10days = price
  }
  

  fs.writeFile('server/price.json', JSON.stringify(pricedata), err => {
      if (err) {
        throw err
      }

  });
  */
}


//getInfofordays(10).then(res => {
// 
//})


async function NumDaysInvest(address, creditAddress) {
  var translist = await getTransList(address)
  var rTranslist = translist.result.reverse()
  var creditTrans = []
  var res = []
  
  //loop to get num transaction
  for(let i=0; i < rTranslist.length; i++) {
    if(rTranslist[i].address == creditAddress) {
      creditTrans.push(rTranslist[i].block_timestamp)
    }
  }

  //calculate the profite since 
  var date = new Date(creditTrans[0])
  let fprice = await fetchDateToPrice(date, [])
  let lprice = await getLivePrice()

  var profit = ((lprice['usdPrice'] / fprice[0]) * 100) - 100

  res[0] = creditTrans[0]
  res[1] = creditTrans.length;
  res[2] = profit;
  return res

}


async function calculateMoney(numToken) {
  lprice = await getLivePrice()
  var money = (numToken * lprice['usdPrice'])
  return money
}

// express server 
// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(busboy())

// Enable CORS for all methods

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

const possible_bg = ["blue", "red", "green", "aqua", "purple"]
const possible_img = ["blue", "red", "green", "aqua", "purple"]

app.post('/connection', (req, res) => {
  const data = req.body;
  //var exist = 0;
  console.log(data.address)

  
  let params = {
      TableName: tableName,
      Key: {
        users: data.address
      }
    }
    dynamodb.get(params, (error, result) => {
      if (error) {
        console.log(error)
        //res.json({ statusCode: 500, error: error.message })
      } else {
        if(result.Item) {
          res.json({ bg: result.Item.bg, img: result.Item.img, cust_img: result.Item.cust_img, name: result.Item.name})
        }
        else {
          console.log("[DEBUG -connection] new user added: " + data.address)
          var newbg = possible_bg[Math.floor(Math.random() * possible_bg.length)]
          var newimg =  possible_img[Math.floor(Math.random() * possible_img.length)]

          let create_params = {
            TableName: tableName,
            Item: {
              users: data.address,
              name: data.address, //default username store is the address
              bg: newbg,
              img: newimg,
              cust_img: false
            }
          }

          dynamodb.put(create_params, (error, result) => {
            if (error) {
              res.json({error: error.message});
            } else {
              res.json({bg: newbg, img: newimg, cust_img: false, name: data.address});
          }})
        }

        
        

      }
    })



    
  /*
  for (let i = 0; i < database.length; i++) {
    if(database[i].address == data.address) {
      console.log("[DEBUG -connection] already a user...")
      var bg = database[i].bg
      var img = database[i].img
      var cust_img = database[i].cust_img

      res.json({bg: bg, img: img, cust_img: cust_img});
      exist = 1;
      break;
    }
  }
  

  if(exist == 0){
    
  

    
    let newuser = {
      address: data.address,
      bg: newbg,
      img: newimg,
      cust_img: false
    }
    database.push(newuser);

    fs.writeFile('amplify/backend/functions/mylambda/src/database.json', JSON.stringify(database), err => {
        if (err) {
          throw err
        }

    });

    console.log(newuser)
    
        
    //res.json({bg: newbg, img: newimg, cust_img: false});
    */
    
});


app.put("/uploadFile", (req, res) => {
  
  if (req.body.is_cust) {
    const params = {
      TableName: tableName,
      Key: {
        users: req.body.account
      }
    }

    dynamodb.get(params, (error, result) => {
      if (error) {
        console.log(error)
        //res.json({ statusCode: 500, error: error.message })
      } else {
        //see if the user already have a custom image
        if (result.Item.cust_img != true) {
          //if no cust_img, set the property to true 
          const params = {
            TableName: tableName,
            Key: {
              users: req.body.account
            },
            //ExpressionAttributeNames: { '#cust_img': 'cust_img' },
            ExpressionAttributeValues: {},
            ReturnValues: 'UPDATED_NEW',
          };
          params.UpdateExpression = 'SET '
          params.ExpressionAttributeValues[':cust_img'] = true;
          params.UpdateExpression += 'cust_img = :cust_img';
          dynamodb.update(params, (error, result) => {
            if (error) {
              console.log(error.message);
            }
          });
        }
        else {
          console.log("already a custom image")
        }
        

      }
    })
    
  }
  //set background
  if (req.body.background) {
    if (req.body.background != "") {
      const backparams = {
          TableName: tableName,
          Key: {
            users: req.body.account,
          },
          //ExpressionAttributeNames: { '#bg': 'bg' },
          ExpressionAttributeValues: {},
          ReturnValues: 'UPDATED_NEW',
      };
      backparams.UpdateExpression = 'SET '
      backparams.ExpressionAttributeValues[':bg'] = req.body.background;
      backparams.UpdateExpression += 'bg = :bg'

      dynamodb.update(backparams, (error, result) => {
          if (error) {
            console.log(error.message);
            res.json({error: error.message, params: backparams})
          }
          else {
            //res.send("success")
          }
      });
      
    }
  }
  //update the name of an account
  if (req.body.name) {
    if (req.body.name != "") {
      const nameparams = {
        TableName: tableName,
        Key: {
          users: req.body.account,
        },
        ExpressionAttributeNames: { '#nm': 'name' },
        ExpressionAttributeValues: {},
        ReturnValues: 'UPDATED_NEW',
    };
    nameparams.UpdateExpression = 'SET '
    nameparams.ExpressionAttributeValues[':name'] = req.body.name;
    nameparams.UpdateExpression += '#nm = :name'

    dynamodb.update(nameparams, (error, result) => {
        if (error) {
          console.log(error.message);
          res.json({error: error.message, params: nameparams})
        }
        else {
          //res.send("success")
        }
    });
     
    }
  
  }
  res.send("done")
  
})

app.get("/livePrice", (req, res) => {
  getLivePrice().then( lprice => {
    res.json({lprice: lprice['usdPrice']})
  })
  
})


app.get("/historicalPrice", (req, res) => {
  let params = {
    TableName: priceName,
    Key: {
      id: 0
    }
  }
  dynamodb.get(params, (error, result) => {
    if (error) {
      res.json({ statusCode: 500, error: error.message });
    } else {
      res.json({ hprice: result.Item.price10day }) //.10dayPrice
    }
  });
  
});

app.post("/liveMoney", (req, res) => {
  calculateMoney(req.body.numToken).then( money => {
    res.json({ money: money });
  }
  )
});

app.post("/timeInvest", (req, res) => {
  console.log(req.body)
  const data = req.body

  NumDaysInvest(data.address, data.tokenAddress).then( results => {
    res.json({ timeInvest: results[0], numTrans: results[1], profit: results[2]})
  })
  
})

//listing an item using the api
//params: address, itemid, name

//address: {
//  itemid: [] //all items that an account has listed
//  name: [] //all names corresponding for each new listed item
//}



app.post("/listItem", (req, res) => {
  let params = {
    TableName: ItemName,
    Key: {
      address: req.body.address
    }
  }

  dynamodb.get(params, (error, result) => {
    if (error) {
      res.json({ statusCode: 500, error: error.message });
    } else {
      if(result.Item) {
        const newItem = result.Item.itemid.push(req.body.itemid) // new id
        const newName = result.Item.name.push(req.body.name) // new name
        const newItems_params = {
          TableName: ItemName,
          Key: {
            address: req.body.address,
          },
          ExpressionAttributeNames: { '#nm': 'name' },
          ExpressionAttributeValues: {},
          ReturnValues: 'UPDATED_NEW',
        };
        newItems_params.UpdateExpression = 'SET '
        newItems_params.ExpressionAttributeValues[':itemid'] = newItem;
        newItems_params.UpdateExpression += 'itemid = :itemid, '
        newItems_params.ExpressionAttributeValues[':name'] = newName;
        newItems_params.UpdateExpression += '#nm = :name'

        dynamodb.update(newItems_params, (error, result) => {
            if (error) {
              console.log(error.message);
              res.json({error: error.message, params: newItems_params})
            }
            else {
              res.send("success")
            }
        });
      }
      else {
        //if no items are listed yet, create the first
        let list_params = {
          TableName: ItemName,
          Item: {
            address: req.body.address,
            itemid: [req.body.itemid], //list of item ids
            name: [req.body.name] //list of names
          }
        }
      
        dynamodb.put(list_params, (error, result) => {
          if (error) {
            res.json({error: error.message});
          } else {
            res.json({itemid: result});
        }})
      }
    }
  });
  
})

app.post("/getItems", (req, res) => {
  let params = {
    TableName: ItemName,
    Key: {
      address: req.body.address
    }
  }
  dynamodb.get(params, (error, result) => {
    if (error) {
      res.json({ statusCode: 500, error: error.message });
    } else {
      if(result.Item) {
        res.json({ ids: result.Item.itemid, names: result.Item.name}) //multiple itemids
      }
      else{
        res.send("bruh")
      }
    }
  });
})



// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
