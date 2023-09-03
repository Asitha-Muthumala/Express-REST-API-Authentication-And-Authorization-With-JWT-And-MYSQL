const express = require('express');
const { user_controller } = require('../controller/auth_controller');

const router = express.Router();

router.route("/user").post(user_controller);

module.exports = router;