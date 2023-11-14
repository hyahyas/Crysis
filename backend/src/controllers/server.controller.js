const { Server, Membership } = require("../models/server.model");
const { User } = require("../models/user.model");
const { validationResult } = require("express-validator");
const { logEndPoint, checkUserIsAdmin, handleError } = require("../utils/util");

// Controller to create a new server
exports.createServer = async (req, res) => {
    logEndPoint("POST", "/createServer");

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Create a new server
        const decoded = req.decoded;
        const { name, description } = req.body;
        const ownerId = decoded.id;

        // Make the owner an admin by default
        const server = new Server({
            name,
            description,
            owner: ownerId,
        });

        await server.save();

        const membership = new Membership({
            member: ownerId,
            server: server._id,
            isAdmin: true,
        });

        await membership.save();

        res.json({ message: "Server created successfully", server });
    } catch (err) {
        // Handle errors using the centralized error handling function
        handleError(res, err);
    }
};

// Controller to get all servers
exports.getAllServers = async (req, res) => {
    logEndPoint("GET", "/getAllServers");

    try {
        const servers = await Server.find({}).populate("owner", "name"); // Populate owner details

        servers.map(async (server) => {
            const members = await Membership.find({
                server: server._id,
            }).populate("member", "name");
            console.log(members);
            server.members = members.map(async (member) => member.member);
        });

        res.json(servers);
    } catch (err) {
        handleError(res, err);
    }
};

// Controller to get all servers of a user
exports.getMyServers = async (req, res) => {
    logEndPoint("GET", "/getMyServers");

    try {
        const decoded = req.decoded;
        const userId = decoded.id;

        // get role from query params and return those servers
        const role = req.query.role;

        const memberships = await Membership.find({
            member: userId,
        }).populate("server", ["name", "description", "owner", "createdAt"]);

        const servers = memberships.map((membership) => membership.server);

        res.json(servers);
    } catch (err) {
        handleError(res, err);
    }
};

// Controller to get a single server by ID
exports.getServerById = async (req, res) => {
    logEndPoint("GET", "/getServer/:serverId");

    try {
        console.log(req.params.serverId);
        const server = await Server.findById(req.params.serverId).populate(
            "owner",
            "name"
        ); // Populate owner details
        console.log(server);
        if (!server) {
            return res.status(404).json({ error: "Server not found" });
        }

        res.json(server);
    } catch (err) {
        handleError(res, err);
    }
};

// Controller to update a server by ID
exports.updateServer = async (req, res) => {
    logEndPoint("PUT", "/updateServer/:serverId");

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, description } = req.body;
        const serverId = req.params.serverId;

        const isAdmin = await checkUserIsAdmin(serverId, req.decoded.id);
        if (isAdmin) {
            const updatedServer = await Server.findByIdAndUpdate(
                serverId,
                { name, description },
                { new: true }
            );

            if (!updatedServer) {
                return res.status(404).json({ error: "Server not found" });
            }

            res.json({
                message: "Server updated successfully",
                server: updatedServer,
            });
        } else {
            return res
                .status(403)
                .json({ message: "Forbidden, user not an admin" });
        }
    } catch (err) {
        handleError(res, err);
    }
};

// Controller to delete a server by ID
exports.deleteServer = async (req, res) => {
    logEndPoint("DELETE", "/deleteServer/:serverId");

    try {
        const serverId = req.params.serverId;

        const isAdmin = await checkUserIsAdmin(serverId, req.decoded.id);
        if (isAdmin) {
            const deletedServer = await Server.findByIdAndDelete(serverId);

            if (!deletedServer) {
                return res.status(404).json({ error: "Server not found" });
            }

            res.json({
                message: "Server deleted successfully",
                server: deletedServer,
            });
        } else {
            return res
                .status(403)
                .json({ message: "Forbidden, user not an admin" });
        }
    } catch (err) {
        handleError(res, err);
    }
};

// Controller to add a member to the server
exports.updateMemberInServer = async (req, res) => {
    logEndPoint("PATCH", "/server/:serverId/updateMember");

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const decoded = req.decoded;
        const userId = decoded.id;
        const serverId = req.params.serverId;

        // Check if the user is an admin
        const isAdmin = await checkUserIsAdmin(serverId, userId);

        // Find the server
        const server = await Server.findById(serverId);
        if (!server) {
            return res.status(404).json({ error: "Server not found" });
        }

        if (!isAdmin) {
            return res
                .status(403)
                .json({ message: "Forbidden, user not an admin" });
        }

        // Find the user by email
        const { email, admin } = req.body;
        console.log(email);
        const memberUser = await User.findOne({ email }).select("-password");
        //console.log(email)
        //console.log(memberUser)
        // If the user doesn't exist, return an error
        if (!memberUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Find the existing membership
        let existingMembership = await Membership.findOne({
            server: serverId,
            member: memberUser._id,
        });
        console.log(existingMembership);

        if (!existingMembership) {
            const newMembership = new Membership({
                server: serverId,
                member: memberUser._id,
                isAdmin: admin || false,
            });
            //create membership for server
            console.log(newMembership);
            await newMembership.save();
            existingMembership = newMembership;
        }

        // Update the isAdmin value if provided
        if (admin !== undefined) {
            existingMembership.isAdmin = admin;
        }

        await existingMembership.save();

        res.json({
            message: "Member information updated in the server successfully",
            member: memberUser,
            isAdmin: existingMembership.isAdmin,
        });
    } catch (err) {
        handleError(res, err);
    }
};

// Controller to remove a member from the server
exports.removeMemberFromServer = async (req, res) => {
    logEndPoint("PATCH", "/server/:serverId/removeMember");

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const decoded = req.decoded;
        const userId = decoded.id;

        const serverId = req.params.serverId;

        // Find the server
        const server = await Server.findById(serverId);
        if (!server) {
            return res.status(404).json({ error: "Server not found" });
        }

        // Check if the user is an admin
        const isAdmin = await checkUserIsAdmin(serverId, userId);
        if (!isAdmin) {
            return res
                .status(403)
                .json({ message: "Forbidden, user not an admin" });
        }

        // Find the user by email
        const { email } = req.body;
        const memberUser = await User.findOne({ email }).select("-password");

        // If the user doesn't exist, return an error
        if (!memberUser) {
            return res.status(404).json({ error: "User to remove not found" });
        }

        // Find the existing membership
        const existingMembership = await Membership.findOne({
            server: serverId,
            member: memberUser._id,
        });

        if (!existingMembership) {
            return res.status(404).json({
                error: "User to remove is not a member of the server",
            });
        }

        // Remove the membership
        console.log(existingMembership);
        await Membership.findOneAndDelete(existingMembership);

        res.json({
            message: "Member removed from the server successfully",
            member: memberUser,
        });
    } catch (err) {
        handleError(res, err);
    }
};
