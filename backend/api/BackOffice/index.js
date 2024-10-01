const AccessManagment = require("express").Router()

const getaddfund = require("./controllers/getaddfund")
 
 
AccessManagment.get("/addfund", getaddfund)
 
 
 
 
 
exports.AccessManagment = AccessManagment;