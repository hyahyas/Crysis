const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now }, // Automatically set to the current date
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // FK reference to User
});
  
const Announcement = mongoose.model('Announcement', announcementSchema, "Announcements");

module.exports = Announcement;