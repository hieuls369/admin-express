const db = require('../db');

//display login screen & clear cookie
module.exports.loginPage = (req, res) => {    
    res.clearCookie('userID');
    res.render('login');
}
//set signed cookie for user
module.exports.login = (req, res) => {
    var user = db.get('user').find({name : req.body.name}).value();
    res.cookie('userID', user.id, {
        signed: true
    });
    res.redirect('/user');
}
//from guest redirect to user
module.exports.guest = (req, res) => {
    res.redirect('/user');
}

