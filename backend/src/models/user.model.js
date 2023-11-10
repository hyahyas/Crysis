const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

const Role = mongoose.model("Role", roleSchema, "Roles");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
        default: "user",
    },
});

// arg1: name of model in app, arg2: schema, arg3: collection name in db
const User = mongoose.model("User", userSchema, "Users");

module.exports = { User, Role };
