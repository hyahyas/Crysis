const express = require("express");
const {
    createAnnouncement,
    getAnnouncements,
    updateAnnouncement,
    deleteAnnouncement,
} = require("../controllers/announcement.controller");
const recordRoutes = express.Router();
const { extractToken } = require("../middleware/middleware");
const { body, param } = require("express-validator");

// CRUD announcements routes
// verify membership- admin only
recordRoutes
    .route("/announcements")
    .post(extractToken, createAnnouncement)
    .get(
        extractToken,
        [body("serverId").isMongoId().withMessage("Invalid server ID")],
        getAnnouncements
    ); // TODO: Add pagination Done: verify membership
recordRoutes
    .route("/announcements/:id")
    // .put(extractToken, updateAnnouncement)
    .delete(
        extractToken,
        [param("id").isMongoId().withMessage("Invalid announcement ID")],
        deleteAnnouncement
    ); // TODO: verify membership- admin only

module.exports = recordRoutes;
