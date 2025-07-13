const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.port || 5000;

//CORS: cross origin resource sharing
app.use(cors(corsOptions));

//built-in middleare to handle url encoded data aka, form data:
//'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json, supplied to all routes as it comes in
app.use(express.json());

//testing, was able to get this onto the react front
app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] })
})

app.use('/', require('./routes/root'));
// app.use('/signin', require('./routes/auth'))
app.use('/students', require('./routes/api/students'))

//backend server running on port 5000, client server (REACT) will be running on port 3000
app.listen(PORT, () => { console.log(`Server from server.js running on port 5000`) })