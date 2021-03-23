const db = require('../db');
//display the cart screen
module.exports.cart = (req, res) => {
    res.render('cart');
}

//add item into cart
module.exports.cartAdd = (req, res) => {
    var productGet = req.params.productId;
    var sessionGet = db.get('session').find('id').value().id;
    var count = db.get('session')
                .find({id: sessionGet})
                .get('cart.' + productGet, 0)
                .value();

    db.get('session')
    .find({id : sessionGet})
    .set('cart.' + productGet, count + 1)
    .write();
    
    res.redirect(`/product`);
}