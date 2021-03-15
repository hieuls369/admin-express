const express = require('express');
const db = require('../db');
const shortid = require('shortid');
const md5 = require('md5');

const multer = require('multer');
const upload = multer({ dest: '../public/upload/'})

module.exports.home = (req, res) => {
    res.render('user', {
        data: db.get('user').value(),
        search: ''
    })
};

module.exports.search = (req, res) => {
    var text = req.query.search;
    var listGet = db.get('user').filter(item => item.name.toLowerCase().includes(text.toLowerCase())).value();
    res.render('user', {
        data: listGet,
        search: text
    })
};

module.exports.view = (req, res) => {
    var id = req.params.id;
    var users = db.get('user').find({ id: id }).value();
    res.render('view', {
        user: users
    });
};

module.exports.delete = (req, res) => {
    var userId = req.params.id;
    var users = db.get('user').filter(user => user.id !== userId).value();
    db.set('user', users).write(); 
    res.redirect('/user')
};


module.exports.create = (req, res) => {
    res.render('create');
};

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    req.body.password = md5(req.body.password);
    // db.get('user').push(req.body).write();
    // res.redirect('/user');
    console.log(req.body)
};
