const express = require("express");
const { body, param } = require("express-validator");
const {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
    changeTicketStatus,
    getTicketsByAssignee,
    getTicketsByStatus,
} = require("../controllers/tickets.controller");

const ticketRoutes = express.Router();

// Create a new ticket
// TODO: verify membership- admin only
ticketRoutes.post(
    "/createTicket",
    [
        body("title").notEmpty().withMessage("Ticket title is required"),
        // Add more validation as needed
    ],
    createTicket
);

// Get all tickets for the user's current server
// TODO: Add pagination
// TODO: verify membership
ticketRoutes.get("/getAllTickets/:serverId", getAllTickets);

// Get a single ticket by ID
// ticketRoutes.get(
//     "/ticket/:ticketId",
//     [param("ticketId").isMongoId().withMessage("Invalid ticket ID")],
//     getTicketById
// );

// Update a ticket by ID
// TODO: verify membership- admin only
ticketRoutes.patch(
    "/ticket/:ticketId",
    [
        param("ticketId").isMongoId().withMessage("Invalid ticket ID"),
        body("title").notEmpty().withMessage("Ticket title is required"),
        // Add more validation as needed
    ],
    updateTicket
);

// Delete a ticket by ID
// TODO: verify membership- admin only
ticketRoutes.delete(
    "/ticket/:ticketId",
    [param("ticketId").isMongoId().withMessage("Invalid ticket ID")],
    deleteTicket
);

// Change ticket status
// TODO: verify membership- assignee or admin only
ticketRoutes.put("/changeTicketStatus", changeTicketStatus);

// Get tickets by assignee
// ticketRoutes.get('/getTicketsByAssignee', getTicketsByAssignee);

// // Get tickets by status
// ticketRoutes.get('/getTicketsByStatus', getTicketsByStatus);

module.exports = ticketRoutes;
