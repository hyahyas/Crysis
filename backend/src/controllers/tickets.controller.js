const Ticket = require('../models/tickets.model');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Centralized error handling middleware
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
};

const logEndPoint = (type, url) => {
  console.log(new Date().toLocaleString(), '--->', type, ' ', url)
}

// Create a new ticket
exports.createTicket = async (req, res) => {
    // Inside createTicket controller

  logEndPoint('POST', '/createTicket');

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
  logEndPoint('GET', '/getAllTickets');

    try {
      const token = req.headers['authorization'].split(' ')[1];
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
      // Get the serverId from the query parameters, if provided
      const queryServerId = req.params.serverId;
    
      const tickets = await Ticket.find({ server: queryServerId });
  
      res.json(tickets);
    } catch (err) {
      handleError(res, err);
    }
  };
  
  
// Get a single ticket by ID
exports.getTicketById = async (req, res) => {
  logEndPoint('GET', '/getTicket/:ticketId');

  try {
    const ticket = await Ticket.findById(req.params.ticketId);

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
  logEndPoint('PATCH', '/updateTicket/:ticketId');

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
  logEndPoint('DELETE', '/deleteTicket/:ticketId');

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
  logEndPoint('GET', '/getTicketsByStatus');

    try {
      const status = req.body.status;
      const serverId = req.body.serverId;
      //const token = req.headers['authorization'].split(' ')[1];
      //const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      //const serverId = user.serverId;
      console.log(status);
      console.log(serverId);
      const tickets = await Ticket.find({ server: serverId, status: status });
      console.log("Reached here")
      res.json(tickets);
      console.log(tickets);
    } catch (err) {
      handleError(res, err);
    }
  };
  

// Get tickets by assignee
exports.getTicketsByAssignee = async (req, res) => {
  logEndPoint('GET', '/getTicketsByAssignee');

    try {
      const assigneeId = req.body.assigneeId;
      const serverId = req.body.serverId;

    //   const token = req.headers['authorization'].split(' ')[1];
    //   const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //   const serverId = user.serverId;
  
      const tickets = await Ticket.find({ server: serverId, assignee: assigneeId });
  
      res.json(tickets);
    } catch (err) {
      handleError(res, err);
    }
  };


// Change ticket status
exports.changeTicketStatus = async (req, res) => {
  logEndPoint('PATCH', '/changeTicketStatus');

    try {
      const status = req.body.status;
      const token = req.headers['authorization'].split(' ')[1];
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const ticketId= req.body.ticketId;
  
      // Ensure the ticket belongs to the user's server
      const ticket = await Ticket.findOne({ _id: ticketId });
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
  
      ticket.status = status;
      ticket.updatedAt = Date.now();
      await ticket.save();
  
      res.json({ message: 'Ticket status updated successfully', ticket });
    } catch (err) {
      handleError(res, err);
    }
  };
  


  