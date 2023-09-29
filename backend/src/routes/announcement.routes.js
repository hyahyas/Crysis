const express = require("express");
const { createAnnouncement, getAnnouncements, updateAnnouncement, deleteAnnouncement } = require("../controllers/announcement.controller");
const recordRoutes = express.Router();


// CRUD announcements routes
recordRoutes.route("/announcements").post(createAnnouncement).get(getAnnouncements);
recordRoutes.route("/announcements/:id").put(updateAnnouncement).delete(deleteAnnouncement);

module.exports = recordRoutes;