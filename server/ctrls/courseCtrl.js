const Course = require('../model/Course');
const User = require('../model/User');
const mongoose = require('mongoose');
const toID = mongoose.Types.ObjectId;

const createNewCourse = async (req, res) => {
    if (!req?.body?.courseName) {
        return res.status(400).json({ "message": "Course name is required." });
    }
    // if (!req?.body?.courseName || !req?.body?.user) {
    //     return res.status(400).json({ "message": "Course name and User Association are required." });
    // }
    try {
        //create and store the new course record with mongoose
        const result = await Course.create({
            courseName: req.body.courseName
        });
        res.status(201).json(result);
        // connectCourseToUser();

    } catch (err) {
        console.error(err);
    }
}

const connectCourseToUser = async (req, res) => {
    //the cookie is stored on the client,
    const cookies = req.cookies;
    const refreshToken = cookies.jwt;
    //foundUser is a mongoose document that we found and can now modify and save
    const foundUser = await User.findOne({ refreshToken }).exec();

    console.log("found user: ")
    console.log(foundUser.name)
    req.body.user = toID(req.body.user)
    const course = await Course.findById(req.body.courseName)
    course.user = req.body.user;
    course.save()
    // res.json(course)
}

const updateCourse = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ "message": "ID parameter is required." });
    }

    //find and define the course
    const course = await Course.findOne({ _id: req.body.id }).exec();
    if (!course) {
        return res.status(204).json({ "message": `No course with id: ${req.body.id} found.` });
    }
    if (req.body?.courseName) course.courseName = req.body.courseName;
    if (req.body?.user) course.user = req.body.user;
    const result = await course.save(); //this is the course document we found and modified
    res.json(result);
}

const deleteCourse = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": "Course ID required." });

    const course = await Course.findOne({ _id: req.body.id }).exec();
    if (!course) {
        return res.status(204).json({ "message": `No course with id: ${req.body.id} found.` });
    }
    const result = await course.deleteOne({ _id: req.body.id });
    res.json(result);
}

module.exports = {
    createNewCourse,
    updateCourse,
    deleteCourse
};