// Declarations
const express = require('express');
const router = express.Router();
const model = require('../models');

var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/avatars/')
  },
  filename: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg') {
        cb(null, req.body.username+'.jpg')
    }
    return
  }
})
var upload = multer({ storage: storage }).single('avatar')

// Posts Routes
router.get('/', (req, res) => {
    model.Posts.allPosts()
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
    model.Posts.createPost(req.session, req.body).then((result) => {
        res.redirect(`/posts/${result.dataValues.id}`)
    })
});
router.get('/:id', (req, res) => {
    model.Posts.onePost(req.params.id)
    .then(query => {
        res.render('posts_one', {
            postBody: query[0].dataValues,
            postAuthor: query[0].dataValues.user.dataValues,
            postComments: query[1]
        })
    })
});

module.exports = router;
