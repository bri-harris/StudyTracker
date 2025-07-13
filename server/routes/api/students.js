const express = require('express');
const router = express.Router();
const studentsCtrl = require('../../ctrls/studentsCtrl')

//parameters coming from body
router.route('/')
    //get all students
    .get(studentsCtrl.getAllStudents)
    //create a student
    .post(studentsCtrl.createStudent)
    //update a students information
    .put(studentsCtrl.updateStudent)
    //delete a user by ID
    .delete(studentsCtrl.deleteStudent);

//paramater is in the URL
router.route('/:id').get(studentsCtrl.getStudentByID)


module.exports = router;