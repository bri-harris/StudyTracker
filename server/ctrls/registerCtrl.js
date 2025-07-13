const User = require('../model/User');
const bcrypt = require('bcrypt');

//handler for the new user information we receive at this register route
const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    //check for duplicate usernames in our database
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //able to create and store the new user with mongoose
        //regular role 'user' is assigned by default in the User model
        const result = await User.create({
            "username": user,
            "password": hashedPwd
        })

        console.log(result);//record thats been created

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };