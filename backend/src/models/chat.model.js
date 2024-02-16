const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    body: { type: String, required: true },
    sender: {
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

const Chat = mongoose.model("Chat", chatSchema, "Chats");

module.exports = Chat;
