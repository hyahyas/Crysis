const Server = require('../models/server.model');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Define a centralized error handling function
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
};

const logEndPoint = (type, url) => {
  console.log(new Date().toLocaleString(), '--->', type, ' ', url)
}

// Controller to create a new server
exports.createServer = async (req, res) => {
  logEndPoint('POST', '/createServer');

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      // Create a new server
      const token = req.headers['authorization'].split(' ')[1];
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const { name, description } = req.body;
      const ownerId = user.id;
  
      // Make the owner an admin by default
      const server = new Server({
        name,
        description,
        owner: ownerId,
        members: [ownerId], // Add the owner to the members array
        admins: [ownerId],  // Add the owner to the admins array
      });
  
      await server.save();
  
      res.json({ message: 'Server created successfully', server });
    } catch (err) {
      // Handle errors using the centralized error handling function
      handleError(res, err);
    }
  };
  

// Controller to get all servers
exports.getAllServers = async (req, res) => {
  logEndPoint('GET', '/getAllServers');

  try {
    const servers = await Server.find({}).populate('owner', 'name'); // Populate owner details

    res.json(servers);
  } catch (err) {
    handleError(res, err);
  }
};

// Controller to get a single server by ID
exports.getServerById = async (req, res) => {
  logEndPoint('GET', '/getServer/:serverId');

  try {
    console.log(req.params.serverId)
    const server = await Server.findById(req.params.serverId).populate('owner', 'name'); // Populate owner details
    console.log(server)
    if (!server) {
      return res.status(404).json({ error: 'Server not found' });
    }

    res.json(server);
  } catch (err) {
    handleError(res, err);
  }
};

// Controller to update a server by ID
exports.updateServer = async (req, res) => {
  logEndPoint('PUT', '/updateServer/:serverId');

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, description } = req.body;
    const serverId = req.params.serverId;

    const updatedServer = await Server.findByIdAndUpdate(
      serverId,
      { name, description },
      { new: true }
    );

    if (!updatedServer) {
      return res.status(404).json({ error: 'Server not found' });
    }

    res.json({ message: 'Server updated successfully', server: updatedServer });
  } catch (err) {
    handleError(res, err);
  }
};

// Controller to delete a server by ID
exports.deleteServer = async (req, res) => {
  logEndPoint('DELETE', '/deleteServer/:serverId');

  try {
    const serverId = req.params.serverId;

    const deletedServer = await Server.findByIdAndDelete(serverId);

    if (!deletedServer) {
      return res.status(404).json({ error: 'Server not found' });
    }

    res.json({ message: 'Server deleted successfully', server: deletedServer });
  } catch (err) {
    handleError(res, err);
  }
};
