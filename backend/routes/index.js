const express = require('express')
const app = express()
 
 
const { FundsManagment } = require("../api/BackOffice/index.js");
 
app.use("/funds", FundsManagment);
 
 
 
 
module.exports = app