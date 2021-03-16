const express = require('express');

const controller = require('../controller/cart.controller');

//router
const router = express.Router();

//cart routing
router.get('/', controller.cart);

module.exports = router;