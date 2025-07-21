require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const validateJWTToken = require('./middleware/validateJWTToken');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.port || 5000;
const User = require('./model/User');

//connect to mongodb
connectDB();

//CORS: cross origin resource sharing
app.use(cors(corsOptions));

//built-in middleare to handle url encoded data aka, form data:
//'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json, supplied to all routes as it comes in
app.use(express.json());

//middleware for cookies
app.use(cookieParser())

app.get("/api", async (req, res) => {
    try {
        const users = await User.find({}, 'name roles');
        const filtered = users.filter(user => !user.roles || !user.roles.Admin); 
        const usernames = filtered.map(user => user.name);
        res.json({ users: usernames });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

app.use('/', require('./routes/removeStudent'));
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh')); //refresh token might not be needed
app.use('/logout', require('./routes/logout')); //refresh token might not be needed

//need a valid session and JWT Token for all routes below
//app.use(validateJWTToken)
app.use('/tasks', require('./routes/api/tasks'))

//backend server running on port 5000, client server (REACT) will be running on port 3000
//We dont want to listen for requests if we dont connect to mongoose
mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});