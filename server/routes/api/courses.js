const express = require('express');
const router = express.Router();
const Course = require('../../model/Course');
const User = require('../../model/User');
const courseCtrl = require('../../ctrls/courseCtrl')
const mongoose = require("mongoose");
const toID = mongoose.Types.ObjectId;


// const ROLES_LIST = require('../../config/userRoles');
// const verifyRoles = require('../../middleware/verifyRoles');

//parameters coming from body
//any user can create or update a task, as well as retrieve all tasks
router.route('/')
    //create a task
    .post(courseCtrl.createNewCourse)
    //update a tasks information
    .put(courseCtrl.updateCourse)
    //delete a task by ID
    .delete(courseCtrl.deleteCourse);

module.exports = router;