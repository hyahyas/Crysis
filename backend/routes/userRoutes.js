const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
 
// recordRoutes is an instance of the express router.
const recordRoutes = express.Router();

// Centralized error handling middleware
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
};

// test api
recordRoutes.route("/getAllUsers").get(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    handleError(res, err);
  }
});

recordRoutes.route("/signUp").post(
  [
    // Validate name (required)
    body("name").notEmpty().withMessage("Name is required"),

    // Validate email (required and must be an email)
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),

    // Validate password (required and must be at least 6 characters)
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
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
      handleError(res, err);
    }
  }
);

recordRoutes.route("/signIn").post(
  [
    // Validate email (required)
    body("email")
      .notEmpty()
      .withMessage("Email is required"),

    // Validate password (required)
    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
      handleError(res, err);
    }
  }
);

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
    handleError(res, err);
  }
});

recordRoutes.route("/updateUser").patch(
  [
    // Validate name (optional)
    body("name").optional().notEmpty().withMessage("Name is required"),

    // Validate email (optional and must be an email)
    body("email")
      .optional()
      .isEmail()
      .withMessage("Invalid email format"),

    // Validate password (optional and must be at least 6 characters)
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
        // Email must be unique
        email = req.body.email;
        let user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ error: "Email already exists" });
        }
        user.email = req.body.email;
      }
      if (req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
      }
      await user.save();
      res.json({ user: { name: user.name, email: user.email } });
    } catch (err) {
      handleError(res, err);
    }
  
  }
);

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
    handleError(res, err);
  }
});

  

module.exports = recordRoutes;