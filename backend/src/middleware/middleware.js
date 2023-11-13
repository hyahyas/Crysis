const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const checkUserRole = (requiredRole) => {
    return async (req, res, next) => {
        try {
            const token = req.header("authorization").split(" ")[1];
            if (!token) {
                return res.status(401).json({ error: "You must be logged in" });
            }
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            // Fetch the user and populate the 'role' field
            const user = await User.findById(decoded.id).populate("role");

            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            // Check if the user has the required role
            if (user.role.name === requiredRole) {
                return next(); // User has the required role, proceed to the next middleware or route
            } else {
                return res
                    .status(403)
                    .json({ message: "Forbidden, need admin access" }); // User does not have the required role
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
};


//check user role inside gossip
const { Membership } = require("../models/server.model");

const checkUserInServerAndAdmin = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "You must be logged in" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decoded.id;
        const serverId = req.params.serverId; // Assuming serverId is in the request parameters

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

        if (isMember && isAdmin) {
            // User is a member and an admin, proceed to the next middleware or route
            return res.status(200);
        } else {
            // User is not a member or not an admin, return forbidden status
            return res.status(403).json({ message: "Forbidden, user not authorized" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { checkUserInServerAndAdmin };
module.exports = { checkUserRole };
