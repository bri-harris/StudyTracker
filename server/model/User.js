const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    roles: {
        User: {
            type: Number,
            default: 2222
        },
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    refreshToken: String
});

module.exports = mongoose.model("User", UserSchema);