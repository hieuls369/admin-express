const express = require('express');

const controller = require('../controller/auth.controller');
const validation = require('../validate/auth.validate');

//router
const router = express.Router();

//auth routing
router.get('/guest', controller.guest);

router.get('/login', controller.loginPage);

router.post('/login', validation.loginValidate, controller.login);

module.exports = router;