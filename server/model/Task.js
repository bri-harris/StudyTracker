const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//objectID is automatically created by mongoose
const taskSchema = new Schema({
    taskname: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId, ref: "Course"
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },

    startDate: {
        type: Date,
        default: Date.now
    },

    deadline: {
        type: Date,
        default: null
    },

    priority: {
        type: String,
        default: 'medium'
    }


})


//by default when mongoose creates the "TaskTest" model, it will set it to lowercase and plural, so will look for an "tasks" collection in mongodb
module.exports = mongoose.model("Task", taskSchema);