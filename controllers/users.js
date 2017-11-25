// Declarations
const express = require('express');
const router = express.Router();
const model = require('../models');

var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/banners/')
  },
  filename: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg') {
        cb(null, req.body.username+'.jpg')
    }
    return
  }
})
var upload = multer({ storage: storage }).single('banner')

// Users Routes
router.get('/new', (req, res) => {
    res.render('users_new');
});
router.post('/new', (req, res) => {
    model.Users.createUser(req.body).then((result) => {
        upload(req, res, function(err) {
            if (err) {
                return
            }
        })
        res.redirect('/')
    })
});

router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    model.Users.loginUser(username, password).then((result) => {
        if (!result) {
            res.redirect('login?message=Wrong%20username%20or%20password');
        } else {
            req.session.uuid = result;
            res.locals.uuid = req.session.uuid;

            if (req.body.remember === 'on') {
                req.session.cookie.maxAge = 24 * 60 * 60000;
            }
            return
        }
    }).then(result => res.redirect('/'))
});

router.get('/logout', (req, res) => {
    req.session.destroy( () => {
        res.redirect('/');
    });
});

// setup parameter validation or this captures fucking everything
router.get('/:id', (req, res) => {
    model.Users.oneUser()
    .then(query => res.render('users_one', {query: query }))
});

module.exports = router;
