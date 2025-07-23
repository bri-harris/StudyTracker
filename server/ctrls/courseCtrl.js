const Course = require('../model/Course');
const User = require('../model/User');
const mongoose = require('mongoose');

const createNewCourse = async (req, res) => {
    if (!req?.body?.courseName) {
        return res.status(400).json({ "message": "Course name is required." });
    }
    // if (!req?.body?.courseName || !req?.body?.user) {
    //     return res.status(400).json({ "message": "Course name and User Association are required." });
    // }
    try {
        const token = req.cookies?.jwt;
        if (!token) {
            return res.status(401).json({ message: 'No token found in cookies' });
        }
        const foundUser = await User.findOne({ token });
        console.log("found user: ", foundUser.name)
        console.log("User's _id", foundUser._id)


        //create and store the new course record with mongoose
        const newCourse = await Course.create({
            courseName: req.body.courseName,
            user: foundUser._id
        });
        //push the course's objectId onto the users courses array
        foundUser.courses = foundUser.courses || [];
        foundUser.courses.push(newCourse._id);

        //save the change
        await foundUser.save();

        //http 201 means created successfully
        res.status(201).json(newCourse);


    } catch (err) {
        console.error(err);
    }
}

const getAllCourses = async (req, res) => {
    try {
        const token = req.cookies?.jwt;
        if (!token) {
            return res.status(401).json({ message: 'No token found in cookies' });
        }
        const foundUser = await User.findOne({ token }).populate('courses');
        console.log("found user: ", foundUser.name, ", ", "User's _id", foundUser._id)


        // - MongoDB still holds only ObjectIds
        // - In your Node.js memory, user.courses becomes full Course documents.
        // Populate just makes your JavaScript code nicer, not the stored documents richer.
        // foundUser.courses.forEach(course => {
        //     console.log(course.courseName);     // Full field from Course model
        //     console.log(course._id);            // Still has ObjectId
        // });

        res.json(foundUser);

    } catch (err) {
        console.error(err);
    }
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
    getAllCourses,
    updateCourse,
    deleteCourse
};