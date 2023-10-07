const mongoose = require('mongoose');

const serverSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user ObjectIds
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of admin ObjectIds (including the owner)
  // You can add more fields as needed for your server
});

const Server = mongoose.model('Server', serverSchema, 'Servers');

module.exports = Server;
