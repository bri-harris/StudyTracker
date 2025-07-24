const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ 'message': 'email and password are required.' });
    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized

    //evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        //grab roles put on our users JSON
        const roles = Object.values(foundUser.roles);

        // figure out how to decrypt this
        const accessToken = jwt.sign(
            //pass in a payload
            {
                "UserInfo": {
                    "email": foundUser.email,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        //working with setting cookies from server and from backend, cookie created from token
        foundUser.token = accessToken;
        res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        await foundUser.save();


        //save refresh token w/ current user in db to allow logout route
        //foundUser is a mongoose document grabbed from DB
        // foundUser.refreshToken = refreshToken;
        // const result = await foundUser.save();
        // // console.log(result);
        // console.log("this is result._id");
        // console.log(result._id);

        //send refresh token as http cookie
        // res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        // res.cookie('jwt', refreshToken, {httpOnly: true, sameSite:'None', secure: true, maxAge: 24 * 60 * 60 * 1000});

        res.json({ accessToken, roles: foundUser.roles }); //send access token to user
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };