const express = require("express");
const fs = require("fs");
const busboy = require('connect-busboy')
const database = require("./database.json");
//{"users": [

//]}
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

      res.json({bg: bg, img: img});
      exist = 1;
      break;
    }
  }
  //if (data.address in database.users.address) {
    //var bg = database.users.address[data.address].bg
    //var img = database.users.address[data.address].img

    //res.json({bg, img});
  //} else {

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
        
    res.json({bg: newbg, img: newimg});
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
  });
  req.busboy.on('file', function(name, file, info) {
    const { filename, encoding, mimeType } = info;
    console.log("received file: " + filename)
    const fstream = fs.createWriteStream('./server/uploads/' + `${formData.get("fileName")}.jpg`);
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
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});