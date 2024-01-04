const express = require("express");
const { body, param } = require("express-validator");
const {
    createServer,
    getAllServers,
    getServerById,
    updateServer,
    deleteServer,
    getMyServers,
    updateMemberInServer,
    removeMemberFromServer,
    getUsersOfServer,
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

// Get users of a server
serverRoutes.get(
    "/server/:serverId/getUsers",
    extractToken,
    [param("serverId").isMongoId().withMessage("Invalid server ID")],
    getUsersOfServer
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
        body("member").notEmpty().withMessage("Member ID is required"),
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
        body("member").notEmpty().withMessage("Member ID is required"),
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
