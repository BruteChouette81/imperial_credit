const Moralis = require("moralis-v1/node");
const AWS = require('aws-sdk');

/* Moralis information to start server (hide at release) */
const serverUrl = "https://a7p1zeaqvdrv.usemoralis.com:2053/server";
const appId = "N4rINlnVecuzRFow0ONUpOWeSXDQwuErGQYikyte";
const masterKey = "ctP77IRXmuuWvPaubv7OZVvMNk4M9lmbZoqX7heB";
const dynamodb = new AWS.DynamoDB.DocumentClient()
let priceName = "pricedata-dev"



/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */



//get block number (historical)
const fetchDateToPrice = async (somedate, price) => {
    await Moralis.start({ serverUrl, appId, masterKey });
    const options = { chain: "eth", date: somedate};
    const date = await Moralis.Web3API.native.getDateToBlock(options);
    price = await hitoricalFetchPrice(date["block"], price)
    return price
};
  
  
//get the price for a particular block
const hitoricalFetchPrice = async (block, price) => {
    await Moralis.start({ serverUrl, appId, masterKey });
    const options = {
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        chain: "eth",
        to_block: block
  
    };
    const tokenprice = await Moralis.Web3API.token.getTokenPrice(options);
    price.push(tokenprice["usdPrice"])
    return price
};
  
  
//function to get the price for the past X days
async function getInfofordays(numdays) {
    await Moralis.start({ serverUrl, appId, masterKey });
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
    params.UpdateExpression += '#price10day = :price10day';
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

function updatePricedata() {
    getInfofordays(10).then(res => {
      const response = saveInfo(res, 10)
      console.log(response);
    })
}


exports.handler = async (event) => {
    updatePricedata()
    return {};
};
