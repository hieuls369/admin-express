const shortId = require('shortid');

//create session for guest
module.exports.session = (req, res, next) =>{
    if(!req.signedCookies.sessionId){
        var sessionId = shortId.generate();
        res.cookie('sessionId', sessionId, {
            signed: true
        })
    }
    next();
}