const jwt = require('jsonwebtoken');

const verifyJWTCookie = (req, res, next) => {
    const token = req.cookies?.jwt; // Access the JWT stored in cookies
    if (!token) return res.sendStatus(401); // No token present

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // Invalid token
            req.user = decoded.UserInfo?.username;
            req.roles = decoded.UserInfo?.roles;
            next();
        }
    );
};

module.exports = verifyJWTCookie;