const db = require('../db');
const md5 = require('md5');
const { conforms } = require('../db');


//validate for login form
module.exports.loginValidate = (req, res, next) => {
    var existUser = db.get('user').find({name: req.body.name}).value();

    if(!req.body.name || !req.body.password){
        res.render('login', {
            error: 'Please fill all the content',
            values: req.body
        })
        return;
    }

    var hashedPassword = md5(req.body.password);

    if(existUser.name !== req.body.name || existUser.password !== hashedPassword){
        res.render('login', {
            error: 'Username or password was incorrect',
            values: req.body
        })
        return;
    }
    next();
}

//validate exist cookie of an user
module.exports.cookie = (req, res, next) => {
    
    var user = null;

    user = db.get('user').find({id: req.signedCookies.userID}).value();
    if(user){
        res.locals.user = user;
        next();
        return;
    }
    res.locals.user = 'Guest';
    next();
}