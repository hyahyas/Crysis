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

const extractToken = (req, res, next) => {
    let token;
    try {
        token = req.headers["authorization"].split(" ")[1];
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: "You must be logged in" });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.decoded = decoded;
        return next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    checkUserRole,
    extractToken,
};
