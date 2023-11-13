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

module.exports = {
    checkUserInServer,
    checkUserIsAdmin,
};
