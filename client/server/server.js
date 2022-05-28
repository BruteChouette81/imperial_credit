const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

app.post('/connection', (req, res) => {
  const data = req.body;
  // query database | let info[] = Database[data.address]
  // res.json({"bg": info.bg, "action": info.action ...})
  res.json(req.body);
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});