const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

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


//by default when mongoose creates the "Task" model, it will set it to lowercase and plural, so will look for an "tasks" collection in mongodb
module.exports = mongoose.model("Task", courseSchema);