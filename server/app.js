  
require('dotenv').config();
const express = require("express");
const path = require('path');

const app = express();

app.use(express.json());


app.use("/api", require("./api"));
app.use(express.static('../client/build'))

//conect client 
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});


module.exports = app;
