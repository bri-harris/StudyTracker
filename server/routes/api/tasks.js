const express = require('express');
const router = express.Router();
const taskCtrl = require('../../ctrls/taskCtrl')
const verifyJWTCookie = require('../../middleware/validateCookie');

//parameters coming from body
router.route('/')
    //create a task
    .post(verifyJWTCookie, taskCtrl.createNewTask)
    //get the array of tasks associated with a given user
    .get(verifyJWTCookie, taskCtrl.getAllTasks)

// //update a task information
    .put(taskCtrl.updateTask)
// //delete a task by ID
    .delete(taskCtrl.deleteTask);



module.exports = router;