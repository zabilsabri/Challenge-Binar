const jwt = require('jsonwebtoken');
require('dotenv').config();
let JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized'
        });
    }

    let bearer = token.split(' ')[1];

    let test = jwt.verify(bearer, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        req.user = user;
        next();
    });
};