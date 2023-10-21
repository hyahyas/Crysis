const express = require('express');
const { body, param } = require('express-validator');
const { sendMessage, getAllMessages, getMessageById, updateMessage, deleteMessage } = require('../controllers/chat.controller');


const chatRoutes = express.Router();

// Send a message
chatRoutes.route('/sendMessage').post(
  [
    body('body').notEmpty().withMessage('Message body is required'),
    body('serverId').isMongoId().withMessage('Invalid server ID'),
  ],
  sendMessage
);

// Get message history for server
chatRoutes.route('/getHistory/:serverId').get(
  [
    param('serverId').isMongoId().withMessage('Invalid server ID')
  ],
  getAllMessages
);

// Get a single message by ID
chatRoutes.route('/getMessage/:messageId').get(
  [
    param('messageId').isMongoId().withMessage('Invalid message ID')
  ],
  getMessageById
);

// Update a message by ID
chatRoutes.route('/updateMessage/:messageId').patch(
  [
    param('messageId').isMongoId().withMessage('Invalid message ID'),
    body('body').notEmpty().withMessage('Message body is required'),
  ],
  updateMessage
);

// Delete a message by ID
chatRoutes.route('/deleteMessage/:messageId').delete(
  [
    param('messageId').isMongoId().withMessage('Invalid message ID')
  ],
  deleteMessage
);


module.exports = chatRoutes;
