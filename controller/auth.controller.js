const db = require('../db');
const md5 = require('md5');

module.exports.loginPage = (req, res) => {    
    res.clearCookie('userID');
    res.render('login');
}

module.exports.login = (req, res) => {
    var user = db.get('user').find({name : req.body.name}).value();
    res.cookie('userID', user.id, {
        signed: true
    });
    res.redirect('/user');
}

module.exports.guest = (req, res) => {
    res.redirect('/user');
}

