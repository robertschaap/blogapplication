// Declarations
const express = require('express');
const router = express.Router();
const model = require('../models');

// Users Routes
router.get('/new', (req, res) => {
    res.render('users_new');
});
router.post('/new', (req, res) => {
    model.createUser(req.body).then(() => {
        res.send("user created")
    })
});

router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    model.checkUser(username).then((result) => {
        if (result) {
            if(password === result.password) {
                req.session.uuid = result;
                res.locals.uuid = req.session.uuid;

                if (req.body.remember === 'on') {
                    req.session.cookie.maxAge = 24 * 60 * 60000;
                }
                res.redirect('/');
            } else {
                res.redirect('login?message=Wrong%20username%20or%20password');
            }
        } else {
            res.redirect('login?message=Wrong%20username%20or%20password');
        }
    })
});

router.get('/logout', (req, res) => {
    req.session.destroy( () => {
        res.redirect('/');
    });
});

// setup parameter validation or this captures fucking everything
router.get('/:id', (req, res) => {
    model.oneUser()
    .then(query => res.render('users_one', {query: query }))
});

module.exports = router;
