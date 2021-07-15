const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8000, () => console.log("Server Running"));

app.post("/", (req, res) => {
  console.log(req.body);
  // const email = req.body.email;
  console.log(req.body.email);
  res.send();
});
