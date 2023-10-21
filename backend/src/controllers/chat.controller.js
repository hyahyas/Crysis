const Chat = require('../models/chat.model');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Centralized error handling middleware
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
};

// Send a message
exports.sendMessage = async (req, res) => {
  console.log('POST /sendMessage at:', new Date().toLocaleString());

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const token = req.headers['authorization'].split(' ')[1];
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { body, serverId } = req.body;
    const senderId = user.id;

    const chat = new Chat({
      body,
      sender: senderId,
      server: serverId,
    });

    await chat.save();

    res.json({ message: 'Message sent successfully', chat });
  } catch (err) {
      handleError(res, err);
  }
};

// Get message history for server
exports.getAllMessages = async (req, res) => {
  console.log('GET /getHistory at:', new Date().toLocaleString());

  try {
    const serverId = req.params.serverId;

    const chats = await Chat.find({ server: serverId }).populate('server', 'name').populate('sender', 'name');

    res.json({ message: 'Messages retrieved successfully', chats });
  } catch (err) {
      handleError(res, err);
  }
};

// Get a single message by ID
exports.getMessageById = async (req, res) => {
  console.log('GET /getMessage at:', new Date().toLocaleString());

  try {
    const messageId = req.params.messageId;

    const chat = await Chat.findById(messageId).populate('sender', 'name');

    res.json({ chat });
  } catch (err) {
      handleError(res, err);
  }
};

// Update a message by ID
exports.updateMessage = async (req, res) => {
  console.log('PATCH /updateMessage at:', new Date().toLocaleString());

  try {
    const messageId = req.params.messageId;
    const { body } = req.body;
    // make sure that created date is not updated
    const update = {
      body,
      updatedAt: Date.now(),
    };
    const chat = await Chat.findByIdAndUpdate(messageId, update, { new: false }).populate('server', 'name').populate('sender', 'name');

    res.json({ message: 'Message updated successfully', chat });
  } catch (err) {
      handleError(res, err);
  }
};

// Delete a message by ID
exports.deleteMessage = async (req, res) => {
  console.log('DELETE /deleteMessage at:', new Date().toLocaleString());

  try {
    const messageId = req.params.messageId;

    await Chat.findByIdAndDelete(messageId);

    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
      handleError(res, err);
  }
};