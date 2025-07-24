const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//objectID is automatically created by mongoose
const courseSchema = new Schema({
    courseName: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId, ref: "User"
    }
})

module.exports = mongoose.model("Course", courseSchema);