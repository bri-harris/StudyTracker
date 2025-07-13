const express = require('express');
const router = express.Router();
const data = {}
data.students = require('../../model/students.json')

//parameters coming from body
router.route('/')
    //get all students
    .get((req, res) => {
        res.json(data.students)
    })
    //create a student
    .post((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    //update a students information
    .put((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    //delete a user by ID
    .delete((req, res) => {
        res.json({ "id": req.body.id })
    });

//paramater is in the URL
router.route('/:id')
    .get((req, res) => {
        res.json({ "id": req.params.id })
    })


module.exports = router;