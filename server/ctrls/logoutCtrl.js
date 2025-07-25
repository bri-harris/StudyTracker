const User = require('../model/User');

const handleLogout = async (req, res) => {
    //the cookie is stored on the client, also delete the access token

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //no content to send back
    const token = cookies.jwt;

    const foundUser = await User.findOne({ token }).exec();
    // if (!foundUser) {
    //     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    //     return res.sendStatus(204);
    // }

    //We found the token in the database, now we need to delete
    foundUser.token = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = { handleLogout };