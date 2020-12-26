  
require('dotenv').config();
const express = require("express");

const app = express();
app.use(express.json());

app.use(express.static('../client/build'))

//conect client 
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });


app.use("/api", require("./api"));


module.exports = app;
