
const db = require('../db');

//create session for guest
module.exports.session = (req, res, next) =>{
    next();
}