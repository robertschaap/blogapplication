// Declarations
const express = require('express');
const fs = require('fs');
const validate = require('validate.js');

const router = express.Router();
const model = require('../models');

// File Upload
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/avatars/')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.userName+'.jpg');
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        model.Users.checkUserExists( req.body.userName ).then((result) => {
            if(result) {
                return cb(new Error());
            } else if (file.mimetype !== 'image/jpeg') {
                return cb(new Error());
            } else {
                return cb(null, true);
            }
        })
    }
}).single('avatar')

// Users Routes
router.get('/new', (req, res) => {
    res.render('users_new', { message: req.query.message });
});

router.post('/new', (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            res.redirect('./new?message=Error')
        } else {
            let validationResult = validate( {
                firstname: req.body.firstName,
                lastname: req.body.lastName,
                email: req.body.email,
                username: req.body.userName,
                bio: req.body.bio,
                password: req.body.password
            }, {
                firstname: { presence: {allowEmpty: false} },
                lastname: { presence: {allowEmpty: false} },
                email: { presence: {allowEmpty: false} },
                username: { presence: {allowEmpty: false} },
                bio: { presence: {allowEmpty: false} },
                password: { presence: {allowEmpty: false} }
            })
            if ( validationResult ) {
                res.redirect('./new?message=Error')
            } else {
                model.Users.createUser(req.body).then((result) => {
                    fs.rename(`./public/images/avatars/${result.userName}.jpg`, `./public/images/avatars/${result.id}.jpg`, (err) => {
                        if(err) {
                            console.log(err);
                        }
                    })
                    req.session.uuid = result;
                    return
                }).then((result) => {
                    res.redirect('/') });
            }
        }
    })
});

router.get('/login', (req, res) => {
    res.render('login', { message: req.query.message });
});

router.post('/login', (req, res) => {
    let validationResult = validate( {
        username: req.body.userName,
        password: req.body.password
    }, {
        username: { presence: {allowEmpty: false} },
        password: { presence: {allowEmpty: false} }
    })

    if( validationResult ) {
        res.redirect('./login?message=Error');
    } else {
        model.Users.loginUser(req.body.userName, req.body.password).then((result) => {
            if (result) {
                req.session.uuid = result;

                if (req.body.remember === 'on') {
                    req.session.cookie.maxAge = 24 * 60 * 60000;
                }
                res.redirect('/');
            } else {
                res.redirect('./login?message=Error');
            }
        })
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy( () => {
        res.redirect('/');
    });
});

router.get('/profile', (req, res) => {
    model.Users.profileUser(req.session.uuid.id)
    .then(query => {
        res.render('users_profile', { profile: query.profile, posts: query.posts });
    })
});

module.exports = router;
