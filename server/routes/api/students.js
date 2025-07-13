const express = require('express');
const router = express.Router();
const studentsCtrl = require('../../ctrls/studentsCtrl')
const ROLES_LIST = require('../../config/userRoles');
const verifyRoles = require('../../middleware/verifyRoles');

//parameters coming from body
//any user can create or update a student, as well as retrieve all students, only admins can delete
router.route('/')
    //get all students
    .get(studentsCtrl.getAllStudents)
    //create a student
    .post(studentsCtrl.createStudent)
    //update a students information
    .put(studentsCtrl.updateStudent)
    //delete a user by ID
    .delete(verifyRoles(ROLES_LIST.Admin), studentsCtrl.deleteStudent);

//paramater is in the URL
router.route('/:id').get(studentsCtrl.getStudentByID)


module.exports = router;