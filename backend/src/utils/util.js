const { Membership } = require("../models/server.model");

// check if user is member of server
const checkUserInServer = async (serverId, userId) => {
    const isMember = await Membership.exists({
        server: serverId,
        member: userId,
    });
    return isMember;
};

// check if user is admin of server
const checkUserIsAdmin = async (serverId, userId) => {
    const isAdmin = await Membership.exists({
        server: serverId,
        member: userId,
        isAdmin: true,
    });
    return isAdmin;
};

// Centralized error handling middleware
const handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
};

const logEndPoint = (type, url) => {
    console.log(new Date().toLocaleString(), "--->", type, " ", url);
};

module.exports = {
    checkUserInServer,
    checkUserIsAdmin,
    handleError,
    logEndPoint,
};
