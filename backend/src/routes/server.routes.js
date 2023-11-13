const express = require("express");
const { body, param, check } = require("express-validator");
const {
    createServer,
    getAllServers,
    getServerById,
    updateServer,
    deleteServer,
    getMyServers,
    updateMemberInServer,
    removeMemberFromServer
} = require("../controllers/server.controller");
const { checkUserRole } = require("../middleware/middleware");

const serverRoutes = express.Router();

// Create a new server
serverRoutes.post(
    "/createServer",
    [body("name").notEmpty().withMessage("Server name is required")],
    createServer
);

// Get all servers
serverRoutes.route("/getAllServers").get(checkUserRole("admin"), getAllServers);

// Get servers of a user
serverRoutes
    .route("/getMyServers")
    .get(
        [param("role").isIn(["admin", "user"]).withMessage("Invalid role")],
        getMyServers
    );

// Get a single server by ID
serverRoutes.get(
    "/server/:serverId",
    [param("serverId").isMongoId().withMessage("Invalid server ID")],
    getServerById
);

// Update a server by ID
serverRoutes.patch(
    "/server/:serverId",
    [
        param("serverId").isMongoId().withMessage("Invalid server ID"),
        body("name").notEmpty().withMessage("Server name is required"),
    ],
    updateServer
);

// add member to server
serverRoutes.patch(
    "/server/:serverId/updateMember",
    [
        param("serverId").isMongoId().withMessage("Invalid server ID"),
        body("email").notEmpty().isEmail().withMessage("Invalid email format"),
        body("isAdmin").isBoolean().optional(),
    ],
    updateMemberInServer
);

// remove member from server
serverRoutes.patch(
    "/server/:serverId/removeMember",
    [
        param("serverId").isMongoId().withMessage("Invalid server ID"),
        body("email").notEmpty().isEmail().withMessage("Invalid email format"),
    ],
    removeMemberFromServer
);

// server admin restrictions
// add admin to server/ promote member to admin

// remove admin from server

// server admin restrictions
// Delete a server by ID
serverRoutes.delete(
    "/server/:serverId",
    [param("serverId").isMongoId().withMessage("Invalid server ID")],
    deleteServer
);

module.exports = serverRoutes;
