const express = require('express')
const app = express()
 
 
const { AccessManagment } = require("../api/BackOffice/index.js");
 
app.use("/funds", AccessManagment);
 
 
 
 
module.exports = app