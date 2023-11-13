const express = require("express");
const {
    createAnnouncement,
    getAnnouncements,
    updateAnnouncement,
    deleteAnnouncement,
} = require("../controllers/announcement.controller");
const recordRoutes = express.Router();

// CRUD announcements routes
// verify membership- admin only
recordRoutes
    .route("/announcements")
    .post(createAnnouncement)
    .get(getAnnouncements); // TODO: Add pagination Done: verify membership
recordRoutes
    .route("/announcements/:id")
    .put(updateAnnouncement)
    .delete(deleteAnnouncement); // TODO: verify membership- admin only

module.exports = recordRoutes;
