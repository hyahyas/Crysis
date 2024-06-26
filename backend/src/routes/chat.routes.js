const express = require("express");
const { body, param } = require("express-validator");
const {
    sendMessage,
    getAllMessages,
    getMessageById,
    updateMessage,
    deleteMessage,
} = require("../controllers/chat.controller");
const { extractToken } = require("../middleware/middleware");

const chatRoutes = express.Router();

// Send a message
// TODO: verify membership
chatRoutes
    .route("/sendMessage")
    .post(
        extractToken,
        [
            body("body").notEmpty().withMessage("Message body is required"),
            body("serverId").isMongoId().withMessage("Invalid server ID"),
        ],
        sendMessage
    );

// Get message history for server
// TODO: Add pagination
// TODO: verify membership
chatRoutes
    .route("/getHistory/:serverId")
    .get(
        extractToken,
        [param("serverId").isMongoId().withMessage("Invalid server ID")],
        getAllMessages
    );

// Get a single message by ID
chatRoutes
    .route("/message/:messageId")
    .get(
        extractToken,
        [param("messageId").isMongoId().withMessage("Invalid message ID")],
        getMessageById
    );

// Update a message by ID
chatRoutes
    .route("/message/:messageId")
    .patch(
        extractToken,
        [
            param("messageId").isMongoId().withMessage("Invalid message ID"),
            body("body").notEmpty().withMessage("Message body is required"),
        ],
        updateMessage
    );

// Delete a message by ID
chatRoutes
    .route("/message/:messageId")
    .delete(
        extractToken,
        [param("messageId").isMongoId().withMessage("Invalid message ID")],
        deleteMessage
    );

module.exports = chatRoutes;
