const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//objectID is automatically created by mongoose
const studentSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: false
    }
})


//by default when mongoose creates the "Student" model, it will set it to lowercase and plural, so will look for an "employees" collection in mongodb
module.exports = mongoose.model("Student", employeeSchema);