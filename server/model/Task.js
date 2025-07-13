const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//objectID is automatically created by mongoose
const taskSchema = new Schema({
    taskname: {
        type: String,
        required: true
    },
    tasktype: {
        type: String,
        required: true
    },
    duedate: {
        type: Date,
        required: false
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
})


//by default when mongoose creates the "Task" model, it will set it to lowercase and plural, so will look for an "tasks" collection in mongodb
module.exports = mongoose.model("Task", taskSchema);