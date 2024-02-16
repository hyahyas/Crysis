const Chat = require("../models/chat.model");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const {
    checkUserInServer,
    logEndPoint,
    handleError,
} = require("../utils/util");

// Send a message
exports.sendMessage = async (req, res) => {
    logEndPoint("POST", "/sendMessage");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { body, serverId } = req.body;
        const decoded = req.decoded;
        const senderId = decoded.id;

        // Check if the user is a member in the server
        const isMember = await checkUserInServer(serverId, senderId);
        if (!isMember) {
            return res
                .status(403)
                .json({ message: "You are not a member in this server" });
        }

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
        const decoded = req.decoded;
        const userId = decoded.id;

        // Check if the user is a member in the server
        const isMember = await checkUserInServer(serverId, userId);
        if (!isMember) {
            return res
                .status(403)
                .json({ message: "You are not a member in this server" });
        }

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
    logEndPoint("GET", "/message/:messageId");

    try {
        const messageId = req.params.messageId;
        const decoded = req.decoded;
        const userId = decoded.id;

        const message = await Chat.findById(messageId);
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        const serverId = message.server;

        // Check if the user is a member in the server
        const isMember = await checkUserInServer(serverId, userId);
        if (!isMember) {
            return res
                .status(403)
                .json({ message: "You are not a member in this server" });
        }

        const chat = await Chat.findById(messageId).populate("sender", "name");

        res.json({ chat });
    } catch (err) {
        handleError(res, err);
    }
};

// Update a message by ID
exports.updateMessage = async (req, res) => {
    logEndPoint("PATCH", "/message/:messageId");

    try {
        const messageId = req.params.messageId;
        const { body } = req.body;
        const decoded = req.decoded;
        const userId = decoded.id;

        const message = await Chat.findById(messageId);
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        const serverId = message.server;

        // Check if the user is a member in the server
        const isMember = await checkUserInServer(serverId, userId);
        if (!isMember) {
            return res
                .status(403)
                .json({ message: "You are not a member in this server" });
        }

        const originalMessage = await Chat.findById(messageId);
        if (!originalMessage) {
            return res.status(404).json({ message: "Message not found" });
        }
        // Check if the user is the sender of the message
        if (originalMessage.sender != userId) {
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
    logEndPoint("DELETE", "/message/:messageId");

    try {
        const decoded = req.decoded;
        const userId = decoded.id;
        const messageId = req.params.messageId;

        const message = await Chat.findById(messageId);
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        const serverId = message.server;

        // Check if the user is a member in the server
        const isMember = await checkUserInServer(serverId, userId);
        if (!isMember) {
            return res
                .status(403)
                .json({ message: "You are not a member in this server" });
        }

        const chat = await Chat.findById(messageId);
        // Check if the message exists
        if (!chat) {
            return res.status(404).json({ message: "Message not found" });
        }
        // Check if the user is the sender of the message
        if (chat.sender != userId) {
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
