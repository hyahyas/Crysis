const Announcement = require("../models/announcement.model");
const {
    checkUserInServer,
    checkUserIsAdmin,
    logEndPoint,
} = require("../utils/util");

// Create
exports.createAnnouncement = async (req, res) => {
    logEndPoint("POST", "/announcements");
    //check if user is member of server
    try {
        const decoded = req.decoded;

        const userId = decoded.id;
        const serverId = req.body.serverId; // Assuming serverId is in the request parameters

        console.log(userId);
        console.log(serverId);

        // Check if the user is a member in the server
        const isMember = await checkUserInServer(serverId, userId);

        // Check if the user is an admin in the server
        const isAdmin = await checkUserIsAdmin(serverId, userId);

        console.log(isAdmin);
        console.log(isMember);

        if (isMember && isAdmin) {
            // User is a member and an admin, proceed to the next middleware or route
            try {
                const { title, description } = req.body;
                const newAnnouncement = new Announcement({
                    title,
                    description,
                    createdBy: userId,
                    server: serverId,
                });
                await newAnnouncement.save();
                res.json({ message: "Announcement created successfully" });
            } catch (err) {
                res.status(500).json({ message: err });
            }
        } else {
            // User is not a member or not an admin, return forbidden status
            return res
                .status(403)
                .json({ message: "Forbidden, user not authorized" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Read
exports.getAnnouncements = async (req, res) => {
    logEndPoint("GET", "/announcements/:serverId");

    try {
        const decoded = req.decoded;

        const userId = decoded.id;
        const serverId = req.params.id; // Assuming serverId is in the request parameters

        // Check if the user is a member in the server
        const isMember = await checkUserInServer(serverId, userId);

        if (isMember) {
            // User is a member and an admin, proceed to the next middleware or route
            try {
                const announcements = await Announcement.find({
                    server: serverId,
                }).populate("createdBy", "name");
                res.json(announcements);
            } catch (err) {
                res.status(500).json({ message: err });
            }
        } else {
            // User is not a member or not an admin, return forbidden status
            return res
                .status(403)
                .json({ message: "Forbidden, user not a member" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update
// exports.updateAnnouncement = async (req, res) => {
//     logEndPoint("PUT", "/announcements/:id");

//     try {
//         // user can update title or description or both
//         const { title, description } = req.body;
//         await Announcement.findByIdAndUpdate(req.params.id, {
//             title,
//             description,
//         });
//         res.json({ message: "Announcement updated successfully" });
//     } catch (err) {
//         res.status(500).json({ message: err });
//     }
// };

// Delete
exports.deleteAnnouncement = async (req, res) => {
    logEndPoint("DELETE", "/announcements/:id");

    try {
        const decoded = req.decoded;
        const userId = decoded.id;

        const announcementId = req.params.id;
        console.log(announcementId);
        const announcement = await Announcement.findById(announcementId);
        console.log("jjjj", announcement);
        if (!announcement) {
            return res.status(404).json({ error: "Announcement not found" });
        }
        const serverId = announcement.server._id;
        console.log(serverId);

        const isMember = await checkUserInServer(serverId, userId);
        const isAdmin = await checkUserIsAdmin(serverId, userId);
        console.log(isMember);
        console.log(isAdmin);

        if (isMember && isAdmin) {
            // hard delete right now
            await Announcement.findByIdAndDelete(req.params.id);
            res.json({ message: "Announcement deleted successfully" });
        } else {
            // User is not a member or not an admin, return forbidden status
            return res
                .status(403)
                .json({ message: "Forbidden, user not authorized" });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
