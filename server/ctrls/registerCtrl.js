const User = require('../model/User');
const bcrypt = require('bcrypt');

//handler for the new user information we receive at this register route
const handleNewUser = async (req, res) => {
    const { name, email, pwd } = req.body;
    if (!name || !email || !pwd) return res.status(400).json({ 'message': 'name, email and password are required.' });

    //check for duplicate usernames in our database
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //able to create and store the new user with mongoose
        //regular role 'user' is assigned by default in the User model
        const result = await User.create({
            "email": email,
            "name": name,
            "password": hashedPwd
        })

        console.log(result);//record thats been created

        res.status(201).json({ 'success': `New user ${name} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };