const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique:true },
});

// arg1: name of model in app, arg2: schema, arg3: collection name in db
const User = mongoose.model('User', userSchema, "Users");

module.exports = User;