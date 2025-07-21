const allowList = require('./allowList');

const corsOptions = {
    /*origin: (origin, callback) => {
        if (allowList
            .indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Blocked by CORS'))
        }
    },*/
    origin: true, // reflects request origin
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200
}

module.exports = corsOptions;