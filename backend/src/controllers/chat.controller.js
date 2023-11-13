const Chat = require("../models/chat.model");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// Centralized error handling middleware
const handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
};

const logEndPoint = (type, url) => {
    console.log(new Date().toLocaleString(), "--->", type, " ", url);
};

// Send a message
exports.sendMessage = async (req, res) => {
    logEndPoint("POST", "/sendMessage");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const decoded = req.decoded;
        const { body, serverId } = req.body;
        const senderId = decoded.id;

        const chat = new Chat({
            body,
            sender: senderId,
            server: serverId,
        });

        await chat.save();

        res.json({ message: "Message sent successfully", chat });
    } catch (err) {
        handleError(res, err);
    }
};

// Get message history for server
exports.getAllMessages = async (req, res) => {
    logEndPoint("GET", "/getHistory/:serverId");

    try {
        const serverId = req.params.serverId;

        const chats = await Chat.find({ server: serverId })
            .populate("server", "name")
            .populate("sender", "name");

        res.json({ message: "Messages retrieved successfully", chats });
    } catch (err) {
        handleError(res, err);
    }
};

// Get a single message by ID
exports.getMessageById = async (req, res) => {
    logEndPoint("GET", "/getMessage/:messageId");

    try {
        const token = req.headers["authorization"].split(" ")[1];
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const messageId = req.params.messageId;

        const chat = await Chat.findById(messageId).populate("sender", "name");

        res.json({ chat });
    } catch (err) {
        handleError(res, err);
    }
};

// Update a message by ID
exports.updateMessage = async (req, res) => {
    logEndPoint("PATCH", "/updateMessage/:messageId");

    try {
        const token = req.headers["authorization"].split(" ")[1];
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const messageId = req.params.messageId;
        const { body } = req.body;

        const originalMessage = await Chat.findById(messageId);
        if (!originalMessage) {
            return res.status(404).json({ message: "Message not found" });
        }
        // Check if the user is the sender of the message
        if (originalMessage.sender != user.id) {
            return res
                .status(403)
                .json({ message: "Cannot update other people's messages" });
        }

        // make sure that created date is not updated
        const update = {
            body,
            updatedAt: Date.now(),
        };
        const chat = await Chat.findByIdAndUpdate(messageId, update, {
            new: false,
        })
            .populate("server", "name")
            .populate("sender", "name");

        res.json({ message: "Message updated successfully", chat });
    } catch (err) {
        handleError(res, err);
    }
};

// Delete a message by ID
exports.deleteMessage = async (req, res) => {
    logEndPoint("DELETE", "/deleteMessage/:messageId");

    try {
        const token = req.headers["authorization"].split(" ")[1];
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const messageId = req.params.messageId;

        const chat = await Chat.findById(messageId);
        // Check if the message exists
        if (!chat) {
            return res.status(404).json({ message: "Message not found" });
        }
        // Check if the user is the sender of the message
        if (chat.sender != user.id) {
            return res
                .status(403)
                .json({ message: "Cannot delete other people's messages" });
        }

        // If the user is the sender, you can proceed with deleting the message
        await chat.remove();

        res.json({ message: "Message deleted successfully" });
    } catch (err) {
        handleError(res, err);
    }
};
