const JWT = require('jsonwebtoken');

const secretKey = 'your_secret_key';

module.exports = function (req, res, next) {

    const token = req.header("auth-token");
    JWT.verify(token, secretKey, (err, decoded) => {

        if (err) {
          return res.json({ message: 'admin permision denied' });
        }

        if (decoded.role != "ADMIN") {
            res.json({
                message: 'admin permision denied'
            })
        }
        else {
            next();
        }
    
    });

}