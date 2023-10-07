const Ticket = require('../models/tickets.model');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Centralized error handling middleware
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
};

// Create a new ticket
exports.createTicket = async (req, res) => {
    // Inside createTicket controller

console.log('Received POST request to create a ticket');

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const token = req.headers['authorization'].split(' ')[1];
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { title, description, status, assigneeId, serverId} = req.body;
    const reporterId = user.id;

    const ticket = new Ticket({
      title,
      description,
      status,
      assignee: assigneeId,
      reporter: reporterId,
      server: serverId,
    });

    await ticket.save();

    res.json({ message: 'Ticket created successfully', ticket });
  } catch (err) {
    handleError(res, err);
  }
};

// Get all tickets for the user's current server or a specified server
exports.getAllTickets = async (req, res) => {
    try {
      const token = req.headers['authorization'].split(' ')[1];
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
      // Get the serverId from the query parameters, if provided
      const queryServerId = req.query.serverId;
  
      // Determine which server to use (current server or specified server)
      const serverToUse = queryServerId || user.currentServer || user.serverId;
  
      const tickets = await Ticket.find({ server: serverToUse }).populate('assignee', 'name');
  
      res.json(tickets);
    } catch (err) {
      handleError(res, err);
    }
  };
  
  
// Get a single ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId).populate('assignee', 'name');

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(ticket);
  } catch (err) {
    handleError(res, err);
  }
};

// Update a ticket by ID
exports.updateTicket = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, status, assigneeId } = req.body;
    const ticketId = req.params.ticketId;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { title, description, status, assignee: assigneeId, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json({ message: 'Ticket updated successfully', ticket: updatedTicket });
  } catch (err) {
    handleError(res, err);
  }
};

// Delete a ticket by ID
exports.deleteTicket = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;

    const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

    if (!deletedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json({ message: 'Ticket deleted successfully', ticket: deletedTicket });
  } catch (err) {
    handleError(res, err);
  }
};

// Get tickets by status
exports.getTicketsByStatus = async (req, res) => {
    try {
      const { status } = req.params;
      const token = req.headers['authorization'].split(' ')[1];
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const serverId = user.serverId;
  
      const tickets = await Ticket.find({ server: serverId, status: status }).populate('assignee', 'name');
  
      res.json(tickets);
    } catch (err) {
      handleError(res, err);
    }
  };
  

// Get tickets by assignee
exports.getTicketsByAssignee = async (req, res) => {
    try {
      const { assigneeId } = req.params;
      const token = req.headers['authorization'].split(' ')[1];
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const serverId = user.serverId;
  
      const tickets = await Ticket.find({ server: serverId, assignee: assigneeId }).populate('assignee', 'name');
  
      res.json(tickets);
    } catch (err) {
      handleError(res, err);
    }
  };


// Change ticket status
exports.changeTicketStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const token = req.headers['authorization'].split(' ')[1];
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const { ticketId } = req.params;
      const serverId = user.serverId;
  
      // Ensure the ticket belongs to the user's server
      const ticket = await Ticket.findOne({ _id: ticketId, server: serverId });
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
  
      ticket.status = status;
      await ticket.save();
  
      res.json({ message: 'Ticket status updated successfully', ticket });
    } catch (err) {
      handleError(res, err);
    }
  };
  

// Change ticket assignee
exports.changeTicketAssignee = async (req, res) => {
    try {
      const { assigneeId } = req.body;
      const token = req.headers['authorization'].split(' ')[1];
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const { ticketId } = req.params;
      const serverId = user.serverId;
  
      // Ensure the ticket belongs to the user's server
      const ticket = await Ticket.findOne({ _id: ticketId, server: serverId });
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
  
      ticket.assignee = assigneeId;
      await ticket.save();
  
      res.json({ message: 'Ticket assignee updated successfully', ticket });
    } catch (err) {
      handleError(res, err);
    }
  };
  