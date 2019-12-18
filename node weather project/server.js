/* Requires */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

 /*definitions */
const app = express();
const port = 7000;
var data = [{ name: "place", temperature: 25 }];

/* Usings */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("client"));

/* Post */
app.post("/app", (req, res) => {
  data.push(req.body);
  res.send("Done");
});

/* Get */
app.get("/app", (req, res) => {
  res.send(data);
});

/* Port, check */
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
