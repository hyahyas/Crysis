const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);
 
var _db;
 
module.exports = {
  connectToServer: async function (callback) {
    try {
      await client.connect();
    } catch (e) {
      console.error(e);
    }

    _db = client.db("Dev_db");

    try {
      var count = await _db.collection("Users").countDocuments();
      console.log(count);
    } catch (e) {
      console.error(e);
    }
  },
 
  getDb: function () {
    return _db;
  },
};