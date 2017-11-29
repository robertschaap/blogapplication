// Declarations
const express = require('express');
const fs = require('fs');
const router = express.Router();
const model = require('../models');

// File Upload
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/banners/');
    },
    filename: (req, file, cb) => {
        cb(null, req.session.uuid.userName+'.jpg');
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        model.Users.checkUserExists( req.body.username ).then((result) => {
            if(result) {
                return cb(new Error());
            } else if (file.mimetype !== 'image/jpeg') {
                return cb(new Error());
            } else {
                return cb(null, true);
            }
        });
    }
}).single('banner');

// Posts Routes
router.get('/', (req, res) => {
    model.Posts.allPosts( req.query.cat )
    .then((query) => {
        res.render('posts_all', {
            query: query,
            category: req.query.cat
        });
    });
});
router.get('/new', (req, res) => {
    if (req.session.uuid) {
        res.render('posts_new');
    } else {
        res.redirect('/users/login')
    }
});

router.post('/new', (req, res) => {
    upload(req, res, (err) =>{
        if(err) {
            res.send('error');
        }
        model.Posts.createPost(req.session, req.body).then((result) => {
            fs.rename(`./public/images/banners/${req.session.uuid.userName}.jpg`, `./public/images/banners/${result.id}.jpg`, (err) => {
                if(err) {
                    console.log(err);
                }
            });
            res.redirect(`/posts/${result.dataValues.id}`);
        });
    });
});


router.get('/:id', (req, res) => {
    model.Posts.onePost(req.params.id)
    .then((query) => {
        res.render('posts_one', {
            postBody: query[0].dataValues,
            postAuthor: query[0].dataValues.user.dataValues,
            postComments: query[1]
        });
    });
});

module.exports = router;
