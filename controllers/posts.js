// Declarations
const express = require('express');
const router = express.Router();
const model = require('../models');

// Posts Routes
router.get('/', (req, res) => {
    model.allPosts()
    .then(query => {
        res.render('posts_all', {
            query: query,
            category: req.query.cat
        })
    })
});

router.get('/new', (req, res) => {
    if (req.session.uuid) {
        res.render('posts_new');
    } else {
        res.redirect('/users/login')
    }
});
router.post('/new', (req, res) => {
    model.createPost(req.session, req.body).then((result) => {
        res.redirect(`/posts/${result.dataValues.id}`)
    })
});

router.get('/:id', (req, res) => {
    model.onePost(req.params.id)
    .then(query => {
        res.render('posts_one', {
            postBody: query[0].dataValues,
            postAuthor: query[0].dataValues.user.dataValues,
            postComments: query[1]
        })
    })
});


module.exports = router;
