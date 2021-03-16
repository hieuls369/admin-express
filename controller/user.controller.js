const express = require('express');
const db = require('../db');
const shortid = require('shortid');
const md5 = require('md5');


//display manage user screen with user data
module.exports.home = (req, res) => {
    res.render('user', {
        data: db.get('user').value(),
        search: ''
    })
};

//display searched user data by name
module.exports.search = (req, res) => {
    var text = req.query.search;
    var listGet = db.get('user').filter(item => item.name.toLowerCase().includes(text.toLowerCase())).value();
    res.render('user', {
        data: listGet,
        search: text
    })
};

//display details of an user
module.exports.view = (req, res) => {
    var id = req.params.id;
    var users = db.get('user').find({ id: id }).value();
    res.render('view', {
        user: users
    });
};


//delete user (bug with when delete all)
module.exports.delete = (req, res) => {
    var userId = req.params.id;
    var users = db.get('user').filter(user => user.id !== userId).value();
    db.set('user', users).write(); 
    res.redirect('/user')
};

//display create user screen
module.exports.create = (req, res) => {
    res.render('create');
};

//push the created data into the database
module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    req.body.password = md5(req.body.password);
    req.body.avatar = req.file.path.split('/').slice(1).join('/');
    db.get('user').push(req.body).write();
    res.redirect('/user');
};
