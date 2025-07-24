const express = require('express');
const router = express.Router();
const courseCtrl = require('../../ctrls/courseCtrl')
const verifyJWTCookie = require('../../middleware/validateCookie');

router.route('/')
    //create a task
    .post(verifyJWTCookie, courseCtrl.createNewCourse)
    //get the array of courses associated with a given user
    .get(verifyJWTCookie, courseCtrl.getAllCourses)

// //update a tasks information
// .put(courseCtrl.updateCourse)
// //delete a task by ID
// .delete(courseCtrl.deleteCourse);

module.exports = router;