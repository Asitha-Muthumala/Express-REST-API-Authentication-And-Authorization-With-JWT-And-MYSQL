const JWT = require('jsonwebtoken');

const secretKey = 'your_secret_key';

module.exports = function (req, res, next) {

    const token = req.header("auth-token");
    JWT.verify(token, secretKey, (err, decoded) => {

        if (err) {
          return res.json({ message: 'user permision denied' });
        }

        if (decoded.role != "USER") {
            res.json({
                message: 'user permision denied'
            })
        }
        else {
            next();
        }
         
    });

}