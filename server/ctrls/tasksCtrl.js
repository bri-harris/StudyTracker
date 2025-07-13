const Task = require('../model/Task');

const getAllTasks = async (req, res) => {
    const tasks = await Task.find();
    if (!tasks) return res.status(204).json({ "message": "No tasks found." }); //204 means no content
    res.json(tasks);
}

const createNewTask = async (req, res) => {
    if (!req?.body?.taskname || !req?.body?.tasktype) {
        return res.status(400).json({ "message": "Task name and type are required." });
    }
    try {
        //create and store the new task record with mongoose
        const result = await Task.create({
            taskname: req.body.taskname,
            tasktype: req.body.tasktype
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateTask = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ "message": "ID parameter is required." });
    }

    //find and define the task
    const task = await Task.findOne({ _id: req.body.id }).exec();
    if (!task) {
        return res.status(204).json({ "message": `No task with id: ${req.body.id} found.` });
    }
    if (req.body?.taskname) task.taskname = req.body.taskname;
    if (req.body?.tasktype) task.tasktype = req.body.tasktype;
    const result = await task.save(); //this is the task document we found and modified
    res.json(result);
}

const deleteTask = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": "Task ID required." });

    const task = await Task.findOne({ _id: req.body.id }).exec();
    if (!task) {
        return res.status(204).json({ "message": `No task with id: ${req.body.id} found.` });
    }
    const result = await task.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getTaskByID = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": "Task ID required." });
    const task = await Task.findOne({ _id: req.params.id }).exec();
    if (!task) {
        return res.status(204).json({ "message": `No task with id: ${req.params.id} found.` });
    }
    res.json(task);
}

module.exports = {
    getAllTasks,
    createNewTask,
    updateTask,
    deleteTask,
    getTaskByID
};