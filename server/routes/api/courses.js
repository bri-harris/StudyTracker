const express = require('express');
const router = express.Router();
const courseCtrl = require('../../ctrls/courseCtrl')
const verifyJWTCookie = require('../../middleware/validateCookie');

router.route('/')
    //create a course
    .post(verifyJWTCookie, courseCtrl.createNewCourse)
    //get the array of courses associated with a given user
    .get(verifyJWTCookie, courseCtrl.getAllCourses)

// //update a course information
    .put(verifyJWTCookie, courseCtrl.updateCourse)
// //delete a course by ID
    .delete(verifyJWTCookie, courseCtrl.deleteCourse);

module.exports = router;