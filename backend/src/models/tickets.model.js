const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: ["To Do", "In Progress", "Done", "Abandoned"],
        default: "To Do",
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, // FK reference to User
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, // FK reference to User
    server: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Server",
        required: true,
    }, // FK reference to Server
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("Ticket", ticketSchema, "Tickets");

module.exports = Ticket;
