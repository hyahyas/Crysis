const Announcement = require("../models/announcement.model");
const jwt = require("jsonwebtoken");
const { checkUserInServerAndAdmin } = require("../middleware/middleware");
const {Membership} = require("../models/server.model")

const logEndPoint = (type, url) => {
    console.log(new Date().toLocaleString(), "--->", type, " ", url);
};


// Create
exports.createAnnouncement = async (req, res) => {
    logEndPoint("POST", "/announcements");
    //check if user is member of server
    try {
        const token = req.headers["authorization"].split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "You must be logged in" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decoded.id;
        const serverId = req.body.serverId; // Assuming serverId is in the request parameters

        console.log(userId)
        console.log(serverId)
        // Check if the user is a member in the server
        const isMember = await Membership.exists({
            server: serverId,
            member: userId,
        });

        // Check if the user is an admin in the server
        const isAdmin = await Membership.exists({
            server: serverId,
            member: userId,
            isAdmin: true,
        });

        console.log(isAdmin)
        console.log(isMember)

        if (isMember && isAdmin) {
            // User is a member and an admin, proceed to the next middleware or route
            try {
                // bearer token in header
                const token = req.headers["authorization"].split(" ")[1];
                const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                const { title, description } = req.body;
                const newAnnouncement = new Announcement({
                    title,
                    description,
                    createdBy: user.id,
                    server: req.body.serverId,
                });
                await newAnnouncement.save();
                res.json({ message: "Announcement created successfully" });
            } catch (err) {
                res.status(500).json({ message: err });
            }
        } 
        else {
            // User is not a member or not an admin, return forbidden status
            return res.status(403).json({ message: "Forbidden, user not authorized" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
            

};

// exports.createAnnouncement = async (req, res) => {
//     logEndPoint("POST", "/announcements");

//     try {
//         // Call the checkUserInServerAndAdmin middleware before proceeding
//         //const x = await checkUserInServerAndAdmin(req, res);
//         //console.log(x)
//         // bearer token in header
//         const token = req.headers["authorization"].split(" ")[1];
//         const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//         const { title, description } = req.body;

//         // Create a new announcement
//         const newAnnouncement = new Announcement({
//             title,
//             description,
//             createdBy: user.id,
//             server: req.params.serverId,
//         });

//         await newAnnouncement.save();
//         res.json({ message: "Announcement created successfully" });
//     } catch (err) {
//         res.status(500).json({ message: "asa" });
//     }
// };


// Read
exports.getAnnouncements = async (req, res) => {
    logEndPoint("GET", "/announcements");

    try {
        const token = req.headers["authorization"].split(" ")[1];
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // get all announcements created in a server
        const serverId = req.body.serverId;

        const announcements = await Announcement.find({ createdBy: user.id });
        res.json(announcements);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

// Update
exports.updateAnnouncement = async (req, res) => {
    logEndPoint("PUT", "/announcements/:id");

    try {
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // user can update title or description or both
        const { title, description } = req.body;
        await Announcement.findByIdAndUpdate(req.params.id, {
            title,
            description,
        });
        res.json({ message: "Announcement updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

// Delete
exports.deleteAnnouncement = async (req, res) => {
    logEndPoint("DELETE", "/announcements/:id");

    try {
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // hard delete right now
        await Announcement.findByIdAndDelete(req.params.id);
        res.json({ message: "Announcement deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
