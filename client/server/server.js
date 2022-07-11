const express = require("express");
const fs = require("fs");
const busboy = require('connect-busboy')
const database = require("./database.json");
const pricedata = require("./price.json")
const Moralis = require("moralis/node");

/* Moralis information to start server (hide at release) */
const serverUrl = "https://a7p1zeaqvdrv.usemoralis.com:2053/server";
const appId = "N4rINlnVecuzRFow0ONUpOWeSXDQwuErGQYikyte";
const masterKey = "ctP77IRXmuuWvPaubv7OZVvMNk4M9lmbZoqX7heB";

// helper function for Moralis api
async function getInfo10days() {
  await Moralis.start({ serverUrl, appId, masterKey });
  var price = []

  const getfordays = async (numdays) => {
    let date0 = new Date();
    let date1 = new Date(date0)
    for (let i = 0; i < numdays; i++) {
        date1.setDate(date1.getDate() - 1)
        console.log(date1)
        
        var block = await fetchDateToBlock(date1)
        console.log(block)
    }
  
  }
  
  //get the price for a particular block
  const hitoricalFetchPrice = async (block) => {
    
    const options = {
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        chain: "eth",
        to_block: block
  
    };
    const tokenprice = await Moralis.Web3API.token.getTokenPrice(options);
    console.log(tokenprice["usdPrice"]);
    price.push(tokenprice["usdPrice"])
  };
  
  //get block number (historical)
  const fetchDateToBlock = async(somedate) => {
    const options = { chain: "eth", date: somedate};
    const date = await Moralis.Web3API.native.getDateToBlock(options);
    console.log(date);
    await hitoricalFetchPrice(date["block"])
    return date
  };

  await getfordays(10);
  return price
}


async function getLivePrice() {
  await Moralis.start({ serverUrl, appId, masterKey });

  const options = {
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    chain: "eth",
  };
  const price = await Moralis.Web3API.token.getTokenPrice(options);
  return price
}

async function getHistoricalPrice(date) {
  await Moralis.start({ serverUrl, appId, masterKey });
  var price = []
  const hitoricalFetchPrice = async (block) => {
    
    const options = {
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        chain: "eth",
        to_block: block
  
    };
    const tokenprice = await Moralis.Web3API.token.getTokenPrice(options);
    console.log(tokenprice["usdPrice"]);
    price.push(tokenprice["usdPrice"])
  };
  
  //get block number (historical)
  const fetchDateToBlock = async(somedate) => {
    const options = { chain: "eth", date: somedate};
    const date = await Moralis.Web3API.native.getDateToBlock(options);
    console.log(date);
    await hitoricalFetchPrice(date["block"])
    return date
  };
  await fetchDateToBlock(date);
  return price[0]
}

//save information to json database
function saveInfo(price, mesure) {
  
  if(mesure == 10) {
    pricedata[0].price10days = price
  }
  

  fs.writeFile('server/price.json', JSON.stringify(pricedata), err => {
      if (err) {
        throw err
      }

  });
}

//getInfo10days().then(res => {
//  saveInfo(res, 10)
//})

async function getTransList(address) {
  await Moralis.start({ serverUrl, appId, masterKey });


  const options = {
    address: address,
    from_block: "0",
  };
  const transfers = await Moralis.Web3API.account.getTokenTransfers(options);
  return transfers
}

async function NumDaysInvest(address, creditAddress) {
  var translist = await getTransList(address)
  var rTranslist = translist.result.reverse()
  var creditTrans = []
  var res = []
  
  //loop to get num transaction
  for(i=0; i < rTranslist.length; i++) {
    if(rTranslist[i].address == creditAddress) {
      creditTrans.push(rTranslist[i].hash)
    }
  }

  //loop to get the first time invest
  for(i=0; i < rTranslist.length; i++) {
    if(rTranslist[i].address == creditAddress) {
      res.push(rTranslist[i].block_timestamp)
      break
    }
  }
  //calculate the profite since 
  var date = new Date(res[0])
  fprice = await getHistoricalPrice(date)
  lprice = await getLivePrice()
  console.log(lprice['usdPrice'])

  var profit = ((lprice['usdPrice'] / fprice) * 100) - 100
  console.log(profit)

  res[1] = creditTrans.length;
  res[2] = profit;
  return res

}

// express server 
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(busboy())

const possible_bg = ["blue", "red", "green", "aqua", "purple"]
const possible_img = ["blue", "red", "green", "aqua", "purple"]

app.post('/connection', (req, res) => {
  const data = req.body;
  var exist = 0;
  for (let i = 0; i < database.length; i++) {
    if(database[i].address == data.address) {
      console.log("already a user...")
      var bg = database[i].bg
      var img = database[i].img
      var cust_img = database[i].cust_img

      res.json({bg: bg, img: img, cust_img: cust_img});
      exist = 1;
      break;
    }
  }

  if(exist == 0){
    console.log("new user added: " + data.address)
    var newbg = possible_bg[Math.floor(Math.random() * possible_bg.length)]
    var newimg =  possible_img[Math.floor(Math.random() * possible_img.length)]
    let newuser = {
      address: data.address,
      bg: newbg,
      img: newimg,
      cust_img: false
    }
    database.push(newuser);

    fs.writeFile('server/database.json', JSON.stringify(database), err => {
        if (err) {
          throw err
        }

    });

    console.log(newuser)
        
    res.json({bg: newbg, img: newimg, cust_img: cust_img});
  }
  //}
  // query database | let info[] = Database[data.address]
  // res.json({"bg": info.bg, "action": info.action ...})
  
});
//fstream.on('close', function() {
//  res.send('upload succeeded!');
//});
app.post("/uploadFile", (req, res) => {
  let formData = new Map();

  req.busboy.on('field', function(fieldname, val) {
    formData.set(fieldname, val);
    for (let i = 0; i < database.length; i++) {
      if(database[i].address == val) {
        if (database[i].cust_img == true) {
          console.log("already a custom image")
          break
        }
        else {
          database[i].cust_img = true
          fs.writeFile('server/database.json', JSON.stringify(database), err => {
            if (err) {
              throw err
            }
          });

          break;
        }
      }
    }
    if (formData.get("background")) {
      if (formData.get("background") != "") {
        for (let i = 0; i < database.length; i++) {
          if(database[i].address == formData.get("account")) {
            database[i].bg = formData.get("background")
            fs.writeFile('server/database.json', JSON.stringify(database), err => {
              if (err) {
                throw err
              }
            });
          }
        }
      }
    }
  });
  req.busboy.on('file', function(name, file, info) {
    const { filename, encoding, mimeType } = info;
    console.log("received file: " + filename)
    const fstream = fs.createWriteStream('./server/uploads/' + `${formData.get("account")}.jpg`);
    file.pipe(fstream);
    fstream.on('close', function() {
      console.log('success')
      res.send('upload succeeded!');
    });
  })
  req.pipe(req.busboy);
})

app.get("/test", (req, res) => {
    res.json({ message: "Hello from server!" });
});


app.get("/historical_price", (req, res) => {
  res.json({ hprice: pricedata[0].price10days });
});

app.post("/time_invest", (req, res) => {
  console.log(req.body)
  const data = req.body

  NumDaysInvest(data.address, data.tokenAddress).then( results => {
    res.json({ timeInvest: results[0], numTrans: results[1], profit: results[2]})
  })
  
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
