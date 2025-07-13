const express = require('express');
const router = express.Router();
const tasksCtrl = require('../../ctrls/tasksCtrl')
const ROLES_LIST = require('../../config/userRoles');
const verifyRoles = require('../../middleware/verifyRoles');

//parameters coming from body
//any user can create or update a task, as well as retrieve all tasks, only admins can delete
router.route('/')
    //get all tasks
    .get(tasksCtrl.getAllTasks)
    //create a task
    .post(tasksCtrl.createNewTask)
    //update a tasks information
    .put(tasksCtrl.updateTask)
    //delete a user by ID
    .delete(verifyRoles(ROLES_LIST.Admin), tasksCtrl.deleteTask);

//paramater is in the URL
router.route('/:id').get(tasksCtrl.getTaskByID)


module.exports = router;