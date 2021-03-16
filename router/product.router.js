const express = require('express');

const controller = require('../controller/product.controller');

//router
const router = express.Router();

//product routing
router.get('/', controller.product);

router.get('/page/:pageNumber', controller.pagination);

module.exports = router;