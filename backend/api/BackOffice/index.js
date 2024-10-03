const FundsManagment = require("express").Router()

const postaddfund = require("./controllers/postaddfund");
const postalldetails = require("./controllers/postalldetails");
const postfunddetails = require("./controllers/postfunddetails");
const postfunds = require("./controllers/postfunds");
const postteamdetails = require("./controllers/postteamdetails");
 
 
FundsManagment.post("/addfund", postaddfund)
FundsManagment.post("/addfundsdetail", postfunddetails)
FundsManagment.post("/addteamdetails", postteamdetails) 
 
FundsManagment.post("/fundsdetail", postfunds)
FundsManagment.post("/alldetails", postalldetails)

 
 
exports.FundsManagment = FundsManagment;