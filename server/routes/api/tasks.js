const express = require('express');
const router = express.Router();
const tasksCtrl = require('../../ctrls/tasksCtrl')
const ROLES_LIST = require('../../config/userRoles');
const verifyRoles = require('../../middleware/verifyRoles');

//parameters coming from body
//any user can create or update a task, as well as retrieve all tasks
router.route('/')
    //get all tasks
    .get(tasksCtrl.getAllTasks)
    //create a task
    .post(tasksCtrl.createNewTask)
    //update a tasks information
    .put(tasksCtrl.updateTask)
    //delete a task by ID
    .delete(tasksCtrl.deleteTask);
// .delete(verifyRoles(ROLES_LIST.Admin), tasksCtrl.deleteTask); //only admins can delete a task by ID

//paramater is in the URL
router.route('/:id').get(tasksCtrl.getTaskByID)


module.exports = router;