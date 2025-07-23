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
    refreshToken: {
        type: String,
        required: false
    },
    course: {
        type: mongoose.Types.ObjectId, ref: "Course"
    }

});

module.exports = mongoose.model("User", UserSchema);