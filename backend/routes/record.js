const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
recordRoutes.route("/getAllUsers").get(async function (req, res) {
 let db_connect = dbo.getDb("Dev_db");
 let result = await db_connect
  .collection("Users")
  .find({})
  .toArray();
  res.json(result);
});


module.exports = recordRoutes;