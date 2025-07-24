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

        //pass in a payload
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        //setting cookies from server / backend, cookie created from token
        foundUser.token = accessToken;
        res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        await foundUser.save();

        res.json({ accessToken, roles: foundUser.roles }); //send access token to user
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };