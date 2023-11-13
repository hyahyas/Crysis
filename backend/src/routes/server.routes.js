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
    removeMemberFromServer,
} = require("../controllers/server.controller");
const { checkUserRole, extractToken } = require("../middleware/middleware");
const e = require("express");

const serverRoutes = express.Router();

// Create a new server
serverRoutes.post(
    "/createServer",
    extractToken,
    [body("name").notEmpty().withMessage("Server name is required")],
    createServer
);

// Get all servers
serverRoutes
    .route("/getAllServers")
    .get(extractToken, checkUserRole("admin"), getAllServers);

// Get servers of a user
serverRoutes
    .route("/getMyServers")
    .get(
        extractToken,
        [param("role").isIn(["admin", "user"]).withMessage("Invalid role")],
        getMyServers
    );

// Get a single server by ID
serverRoutes.get(
    "/server/:serverId",
    extractToken,
    checkUserRole("admin"),
    [param("serverId").isMongoId().withMessage("Invalid server ID")],
    getServerById
);

// Update a server by ID
serverRoutes.patch(
    "/server/:serverId",
    extractToken,
    [
        param("serverId").isMongoId().withMessage("Invalid server ID"),
        body("name").notEmpty().withMessage("Server name is required"),
    ],
    updateServer
);

// add member to server
// add admin to server/ promote member to admin
// remove admin from server
serverRoutes.patch(
    "/server/:serverId/updateMember",
    extractToken,
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
    extractToken,
    [
        param("serverId").isMongoId().withMessage("Invalid server ID"),
        body("email").notEmpty().isEmail().withMessage("Invalid email format"),
    ],
    removeMemberFromServer
);

// server admin restrictions
// server admin restrictions
// Delete a server by ID
serverRoutes.delete(
    "/server/:serverId",
    extractToken,
    [param("serverId").isMongoId().withMessage("Invalid server ID")],
    deleteServer
);

module.exports = serverRoutes;
