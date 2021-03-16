
//validate create user form
module.exports.validatePost = (req, res, next) => {
    
    if(!req.body.name || !req.body.age || !req.body.phone || !req.body.password){
        res.render('create', {
            error: 'Please fill all the content',
            values: req.body
        })
        return;
    }
    next();
}
