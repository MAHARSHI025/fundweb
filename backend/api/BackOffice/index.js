const FundsManagment = require("express").Router()

const getaddfund = require("./controllers/getaddfund");
const postfunds = require("./controllers/postfunds");
 
 
FundsManagment.post("/addfund", getaddfund)
FundsManagment.post("/fundsdetail", postfunds)
 
 
 
 
 
exports.FundsManagment = FundsManagment;