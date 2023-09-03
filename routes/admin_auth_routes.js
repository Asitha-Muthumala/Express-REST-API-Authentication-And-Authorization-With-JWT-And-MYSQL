const express = require('express');
const { admin_controller } = require('../controller/auth_controller');

const router = express.Router();

router.route("/admin").post(admin_controller);

module.exports = router;