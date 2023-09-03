const JWT = require('jsonwebtoken');

const secretKey = 'your_secret_key';

module.exports = function (req, res, next) {

    const token = req.header("auth-token");

    if (!token) {
        res.json({
            message: "Access Denied"
        })
    }

    try {

        const verified = JWT.verify(token, secretKey);

        next();

    }
    catch (err) {
        res.json({
            message: "Access Denied"
        })
    }

}