const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
 
// recordRoutes is an instance of the express router.
const recordRoutes = express.Router();

// test api
recordRoutes.route("/getAllUsers").get(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// test api
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

recordRoutes.route("/signUp").post(async (req, res) => {
  try {
    const { name, password, email } = req.body;
    // Email must be unique
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({ name, password:hashedPassword, email });
    await newUser.save();

    res.json({ message: "User added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

recordRoutes.route("/signIn").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    // Create and send a JWT token upon successful login
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration time
    });

    res.json({ message: "Sign in successful", token});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

recordRoutes.route("/getProfile").get(async (req, res) => {
  try {
    // Get the token from the header
    const token = req.header('authorization').split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "You must be logged in" });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Get the user from the decoded token
    let user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    // Send the user details excluding the password
    res.json({ user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

recordRoutes.route("/updateUser").patch(async (req, res) => {
  try {
    const token = req.header('authorization').split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "You must be logged in" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
    }
    await user.save();
    res.json({ user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

recordRoutes.route("/deleteUser").post(async (req, res) => {
  try {
    // Get the token from the header
    const token = req.header("authorization").split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "You must be logged in" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by their ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Delete the user from the database
    await User.findByIdAndDelete(decoded.userId);

    // Respond with a success message
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

  

module.exports = recordRoutes;