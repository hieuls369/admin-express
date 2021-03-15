const db = require('../db')

const PAGE_SIZE = 4;

function maxPageCal(){
    var productDB = db.get('product').value();
    var productSize = productDB.length;
    var totalPage = productSize / PAGE_SIZE;
    var maxPage = totalPage % 2 === 0 ? totalPage : totalPage + 1;
    return Math.floor(maxPage);
}

module.exports.pagination = (req, res) => {
    var page = req.params.pageNumber;
    var productDB = db.get('product').value();
    var start = (page - 1) * PAGE_SIZE;
    var end = (page - 1) * PAGE_SIZE + PAGE_SIZE; 

    res.render('product', {
        products: productDB.slice(start, end),
        pageNumber: maxPageCal(),
        active: page
    });

}

module.exports.product = (req, res) => {
    var productDB = db.get('product').value();
    res.render('product', {
        products: productDB.slice(0, PAGE_SIZE),
        pageNumber: maxPageCal(),
        active: 1
    });
}