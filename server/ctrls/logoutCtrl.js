const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}//mock database, this will be replaced with a real database later
const fsPromises = require('fs').promises;
const path = require('path');
const { ref } = require('process');
// const bcrypt = require('bcrypt'); //user password authenitcation

const handleLogout = async (req, res) => { //on client also delete the access token
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //no content to send back
    const refreshToken = cookies.jwt;

    //is refresh token in db?
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
        return res.sendStatus(204);
    }

    //We found the refresh token in the database, now we need to delete
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: '' };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    );

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
    res.sendStatus(204);
}


module.exports = { handleLogout };