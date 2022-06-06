const express = require("express");
const fs = require("fs");
const database = require("./database.json");
//{"users": [

//]}
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

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
      img: newimg
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

app.get("/test", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});