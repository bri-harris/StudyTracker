const express = require('express');
const router = express.Router();
const Course = require('../../model/Course');
const User = require('../../model/User');
const courseCtrl = require('../../ctrls/courseCtrl')
const mongoose = require("mongoose");
const verifyJWTCookie = require('../../middleware/validateCookie');
const toID = mongoose.Types.ObjectId;


// const ROLES_LIST = require('../../config/userRoles');
// const verifyRoles = require('../../middleware/verifyRoles');

//parameters coming from body
//any user can create or update a task, as well as retrieve all tasks
router.route('/')
    //create a task
    .post(verifyJWTCookie, courseCtrl.createNewCourse)
    //get the array of courses associated with a given user
    .get(verifyJWTCookie, courseCtrl.getAllCourses)
    //update a tasks information
    .put(courseCtrl.updateCourse)
    //delete a task by ID
    .delete(courseCtrl.deleteCourse);

module.exports = router;