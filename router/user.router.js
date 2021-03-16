const express = require('express');

const controller = require('../controller/user.controller');
const validation = require('../validate/user.validate');
//router
const router = express.Router();

//multer
const multer = require('multer');
const upload = multer({ dest: './public/upload/'})

//user routing
router.get('/', controller.home);

router.get('/search', controller.search);

router.get('/view/:id', controller.view);

router.get('/create', controller.create);

router.post('/create', upload.single('avatar'), controller.postCreate);

router.get('/delete/:id', controller.delete);

module.exports = router;