const express = require('express');
const { user_register, user_login } = require('../controller/user_controller');

const router = express.Router();

router.route("/register").post(user_register);
router.route("/login").post(user_login);

module.exports = router;