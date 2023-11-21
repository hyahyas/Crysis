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
const { extractToken } = require("../middleware/middleware");

const ticketRoutes = express.Router();

// Create a new ticket
ticketRoutes.post(
    "/createTicket",
    extractToken,
    [
        body("title").notEmpty().withMessage("Ticket title is required"),
        body("status")
            .notEmpty()
            .withMessage("Ticket status is required")
            .isIn(["To Do", "In Progress", "Done", "Abandoned"])
            .withMessage("Invalid ticket status"),
    ],
    createTicket
);

// Get all tickets for the user's current server
ticketRoutes.get(
    "/getAllTickets/:serverId",
    extractToken,
    [param("serverId").isMongoId().withMessage("Invalid server ID")],
    getAllTickets
);


// Update a ticket by ID
ticketRoutes.patch(
    "/ticket/:ticketId",
    extractToken,
    [
        param("ticketId").isMongoId().withMessage("Invalid ticket ID"),
        body("title").notEmpty().withMessage("Ticket title is required"),
    ],
    updateTicket
);

// Delete a ticket by ID
ticketRoutes.delete(
    "/ticket/:ticketId",
    extractToken,
    [param("ticketId").isMongoId().withMessage("Invalid ticket ID")],
    deleteTicket
);

// Change ticket status
ticketRoutes.put("/changeTicketStatus", extractToken, changeTicketStatus);

// Get tickets by assignee
// ticketRoutes.get('/getTicketsByAssignee', getTicketsByAssignee);

// // Get tickets by status
// ticketRoutes.get('/getTicketsByStatus', getTicketsByStatus);

module.exports = ticketRoutes;
