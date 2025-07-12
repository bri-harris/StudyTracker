const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.port || 5000;

//CORS: cross origin resource sharing
app.use(cors(corsOptions));

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] })
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//backend server running on port 5000, client server (REACT) will be running on port 3000
app.listen(PORT, () => { console.log(`Server from server.js running on port 5000`) })