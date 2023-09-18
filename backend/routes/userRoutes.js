const express = require("express");
 
// recordRoutes is an instance of the express router.
const recordRoutes = express.Router();
 
const User = require("../models/userModel");

// This route handles incoming GET requests to /getAllUsers.
recordRoutes.route("/getAllUsers").get(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

recordRoutes.route("/addUser").post(async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const newUser = new User({ name, password, email });
    await newUser.save();
    res.json({ message: "User added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = recordRoutes;