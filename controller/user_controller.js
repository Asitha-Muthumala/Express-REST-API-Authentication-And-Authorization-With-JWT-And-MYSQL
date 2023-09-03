const connection = require('../service/db');
const { isEmpty } = require('../utils/object_isEmpty');
const AppError = require('../utils/error');
const bcrypt = require('bcryptjs');
const { USER_MODEL, USER_LOGIN_MODEL } = require('../validation_models/user');
const JWT = require('jsonwebtoken');

const secretKey = 'your_secret_key';

exports.user_login = (req, res, next) => {

    if (isEmpty(req.body)) return next(new AppError('form data not found', 400));

    try {

        const { error } = USER_LOGIN_MODEL.validate(req.body);

        if (error) return next(new AppError(error.details[0].message, 400));

        connection.query("SELECT * FROM user WHERE email = ?", [[req.body.email]], async (err, data, fields) => {
            if (err) return next(new AppError(err, 500));

            if (!data.length) return next(new AppError("email or password invalid", 400));

            const isMatch = await bcrypt.compare(req.body.password, data[0].password);

            if (!isMatch) return next(new AppError("email or password invalid", 400));

            const token = JWT.sign({ name: data[0].name, role: data[0].role }, secretKey, { expiresIn: "1d" });

            res.json({
                data: "Login successful",
                token: token
            })

        })

    }
    catch (err) {
        return next(new AppError(err, 500));
    }

}

exports.user_register = (req, res, next) => {

    if (isEmpty(req.body)) return next(new AppError('form data not found', 400));

    try {

        const { error } = USER_MODEL.validate(req.body);

        if (error) return next(new AppError(error.details[0].message, 400));

        connection.query("SELECT * FROM user WHERE email = ?", [[req.body.email]], async (err, data, fields) => {
            if (err) return next(new AppError(err, 500));

            if (data.length) {
                return next(new AppError("Email is already used", 400))
            }

            const solt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(req.body.password, solt);

            connection.query("INSERT INTO user VALUES(Null, ?)", [[req.body.name, req.body.email, hashedPassword, req.body.role]], (err, data, fields) => {
                if (err) return next(new AppError(err, 500));

                res.json({
                    data: "Registration successful"
                })
            })

        })


    }
    catch (err) {
        return next(new AppError(err, 500));
    }

}