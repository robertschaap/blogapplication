// Declarations
const express = require('express');
const fs = require('fs');
const router = express.Router();
const model = require('../models');

// File Upload
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/avatars/')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.username+'.jpg');
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        model.Users.checkUserExists(req.body.username).then((result) => {
            if(result) {
                return cb(new Error())
            } else if (file.mimetype !== 'image/jpeg') {
                return cb(new Error())
            } else {
                return cb(null, true)
            }
        })
    }
}).single('avatar')

// Users Routes
router.get('/new', (req, res) => {
    res.render('users_new');
});

router.post('/new', (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            res.send('error');
        }
        model.Users.createUser(req.body).then((result) => {
            fs.rename(`./public/images/avatars/${result.userName}.jpg`, `./public/images/avatars/${result.id}.jpg`, (err) => {
                if(err) {
                    console.log(err);
                }
            })
            req.session.uuid = result;
            res.locals.uuid = req.session.uuid;
            return
        }).then(result => res.redirect('/'))
    })
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    let username = req.body.userName;
    let password = req.body.password;

    model.Users.loginUser(username, password).then((result) => {
        console.log('this is line 64-control' + result)
        if (result) {
            console.log('setting session')
            req.session.uuid = result;
            res.locals.uuid = req.session.uuid;

            if (req.body.remember === 'on') {
                req.session.cookie.maxAge = 24 * 60 * 60000;
            }
            return
        } else {
            return
        }
    }).then(result => res.redirect('/'))
});

router.get('/logout', (req, res) => {
    req.session.destroy( () => {
        res.redirect('/');
    });
});

// reroute unlogged users
router.get('/profile', (req, res) => {
    model.Users.profileUser(req.session.uuid.id)
    .then(query => {
        res.render('users_profile', { profile: query.profile, posts: query.posts })
    })
});

module.exports = router;
