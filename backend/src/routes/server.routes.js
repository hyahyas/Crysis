const express = require('express');
const { body, param } = require('express-validator');
const {
  createServer,
  getAllServers,
  getServerById,
  updateServer,
  deleteServer,
} = require('../controllers/server.controller');

const serverRoutes = express.Router();

// Create a new server (no authentication required)
serverRoutes.post(
  '/createServer',
  [
    body('name').notEmpty().withMessage('Server name is required'),
    // Add more validation as needed
  ],
  createServer
);

// Get all servers
serverRoutes.get('/getAllServers', getAllServers);

// Get a single server by ID
serverRoutes.get(
  '/server/:serverId',
  [param('serverId').isMongoId().withMessage('Invalid server ID')],
  getServerById
);

// Update a server by ID
serverRoutes.patch(
  '/server/:serverId',
  [
    param('serverId').isMongoId().withMessage('Invalid server ID'),
    body('name').notEmpty().withMessage('Server name is required'),
    // Add more validation as needed
  ],
  updateServer
);

// Delete a server by ID
serverRoutes.delete(
  '/server/:serverId',
  [param('serverId').isMongoId().withMessage('Invalid server ID')],
  deleteServer
);

module.exports = serverRoutes;
