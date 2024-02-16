const mongoose = require("mongoose");

const serverSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});

const Server = mongoose.model("Server", serverSchema, "Servers");

const membershipSchema = mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    server: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Server",
        required: true,
    },
    isAdmin: { type: Boolean, default: false },
});

const Membership = mongoose.model(
    "Membership",
    membershipSchema,
    "Memberships"
);

module.exports = { Server, Membership };
