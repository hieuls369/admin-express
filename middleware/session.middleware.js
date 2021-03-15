const shortId = require('shortid');

module.exports.session = (req, res, next) =>{
    if(!req.signedCookies.sessionId){
        var sessionId = shortId.generate();
        res.cookie('sessionId', sessionId, {
            signed: true
        })
    }
    next();
}