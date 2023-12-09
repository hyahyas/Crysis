const Ticket = require("../models/tickets.model");
const { validationResult } = require("express-validator");
const {
    checkUserIsAdmin,
    checkUserInServer,
    logEndPoint,
    handleError,
} = require("../utils/util");
const { User, Role } = require("../models/user.model");

// Create a new ticket
exports.createTicket = async (req, res) => {
    logEndPoint("POST", "/createTicket");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const decoded = req.decoded;
        const { title, description, status, assigneeEmail, serverId } =
            req.body;
        const reporterId = decoded.id;
        const assigneeId = await User.findOne({ email: assigneeEmail }).select(
            "_id"
        );

        // Ensure the ticket is created in the by admin of server
        const isAdmin = await checkUserIsAdmin(serverId, reporterId);
        if (!isAdmin) {
            return res
                .status(403)
                .json({ message: "You are not a admin in this server" });
        }

        // Ensure assignee is a member of the server
        const isMember = await checkUserInServer(serverId, assigneeId);
        if (!isMember) {
            return res
                .status(403)
                .json({ message: "Assignee is not a member of this server" });
        }

        let ticket = new Ticket({
            title,
            description,
            status,
            assignee: assigneeId,
            reporter: reporterId,
            server: serverId,
        });

        await ticket.save();

        ticket = await Ticket.findById(ticket._id).populate(
            "assignee reporter",
            "name name"
        );

        res.json({ message: "Ticket created successfully", ticket });
    } catch (err) {
        handleError(res, err);
    }
};

// Get all tickets for the user's current server or a specified server
exports.getAllTickets = async (req, res) => {
    logEndPoint("GET", "/getAllTickets/:serverId");

    try {
        const queryServerId = req.params.serverId;
        const decoded = req.decoded;
        const userId = decoded.id;

        // Ensure the ticket belongs to the user's server
        const isMember = await checkUserInServer(queryServerId, userId);
        if (!isMember) {
            return res
                .status(403)
                .json({ message: "You are not a admin in this server" });
        }

        const tickets = await Ticket.find({ server: queryServerId })
            .populate("assignee reporter", "name email")
            .sort({ updatedAt: -1 });

        res.json(tickets);
    } catch (err) {
        handleError(res, err);
    }
};

// Update a ticket by ID
exports.updateTicket = async (req, res) => {
    logEndPoint("PATCH", "/updateTicket/:ticketId");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, status, assigneeId } = req.body;
        const ticketId = req.params.ticketId;
        const decoded = req.decoded;
        const userId = decoded.id;

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        const serverId = ticket.server;

        // Ensure the ticket belongs to the user's server
        const isAdmin = await checkUserIsAdmin(serverId, userId);
        if (!isAdmin) {
            return res
                .status(403)
                .json({ message: "You are not a admin in this server" });
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            {
                title,
                description,
                status,
                assignee: assigneeId,
                updatedAt: Date.now(),
            },
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        res.json({
            message: "Ticket updated successfully",
            ticket: updatedTicket,
        });
    } catch (err) {
        handleError(res, err);
    }
};

// Delete a ticket by ID
exports.deleteTicket = async (req, res) => {
    logEndPoint("DELETE", "/deleteTicket/:ticketId");

    try {
        const ticketId = req.params.ticketId;
        const decoded = req.decoded;
        const userId = decoded.id;

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        const serverId = ticket.server;

        // Ensure the ticket belongs to the user's server
        const isAdmin = await checkUserIsAdmin(serverId, userId);
        if (!isAdmin) {
            return res
                .status(403)
                .json({ message: "You are not a admin in this server" });
        }

        const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

        if (!deletedTicket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        res.json({
            message: "Ticket deleted successfully",
            ticket: deletedTicket,
        });
    } catch (err) {
        handleError(res, err);
    }
};

// // Get tickets by status
// exports.getTicketsByStatus = async (req, res) => {
//     logEndPoint("GET", "/getTicketsByStatus");

//     try {
//         const status = req.body.status;
//         const serverId = req.body.serverId;
//         //const token = req.headers['authorization'].split(' ')[1];
//         //const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//         //const serverId = user.serverId;
//         console.log(status);
//         console.log(serverId);
//         const tickets = await Ticket.find({ server: serverId, status: status });
//         console.log("Reached here");
//         res.json(tickets);
//         console.log(tickets);
//     } catch (err) {
//         handleError(res, err);
//     }
// };

// // Get tickets by assignee
// exports.getTicketsByAssignee = async (req, res) => {
//     logEndPoint("GET", "/getTicketsByAssignee");

//     try {
//         const assigneeId = req.body.assigneeId;
//         const serverId = req.body.serverId;

//         //   const token = req.headers['authorization'].split(' ')[1];
//         //   const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//         //   const serverId = user.serverId;

//         const tickets = await Ticket.find({
//             server: serverId,
//             assignee: assigneeId,
//         });

//         res.json(tickets);
//     } catch (err) {
//         handleError(res, err);
//     }
// };

// Change ticket status
exports.changeTicketStatus = async (req, res) => {
    logEndPoint("PUT", "/changeTicketStatus");

    try {
        const status = req.body.status;
        const ticketId = req.body.ticketId;
        const decoded = req.decoded;
        const userId = decoded.id;

        // Ensure the ticket belongs to the user's server
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        const assigneeId = ticket.assignee;

        const isAdmin = await checkUserIsAdmin(ticket.server, userId);
        if (!isAdmin && userId !== assigneeId) {
            return res.status(403).json({
                message:
                    "You need to be an admin in this server or assignee of the ticket",
            });
        }

        ticket.status = status;
        ticket.updatedAt = Date.now();
        await ticket.save();

        res.json({ message: "Ticket status updated successfully", ticket });
    } catch (err) {
        handleError(res, err);
    }
};
