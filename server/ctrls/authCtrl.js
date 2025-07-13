const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized
    //evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        //grab roles put on our users JSON
        const roles = Object.values(foundUser.roles);

        //create access & refresh token here
        const accessToken = jwt.sign(
            //pass in a payload
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        //save refresh token w/ current user in db to allow logout route
        //foundUser is a mongoose document grabbed from DB
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        //send refresh token as http cookie
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        // res.cookie('jwt', refreshToken, {httpOnly: true, sameSite:'None', secure: true, maxAge: 24 * 60 * 60 * 1000});

        res.json({ accessToken }); //send access token to user
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };