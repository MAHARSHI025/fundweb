const FundsManagment = require("express").Router()

const postaddfund = require("./controllers/postaddfund");
const postaddperfomance = require("./controllers/postaddperfomance");
const postalldetails = require("./controllers/postalldetails");
const postfunddetails = require("./controllers/postfunddetails");
const postfunds = require("./controllers/postfunds");
const postteamdetails = require("./controllers/postteamdetails");
 
 
FundsManagment.post("/addfund", postaddfund)   //to add new fund
FundsManagment.post("/addfundsdetail", postfunddetails)  //to add fund details
FundsManagment.post("/addteamdetails", postteamdetails)  //to add new team
FundsManagment.post("/addperfomance", postaddperfomance)  //to add new team
 
FundsManagment.post("/fundsdetail", postfunds)  //get names of funds
FundsManagment.post("/alldetails", postalldetails)  //get details of fund

// Route to add performance data
 
 
exports.FundsManagment = FundsManagment;