// Declarations
const express = require('express');
const router = express.Router();
const model = require('../models')

// Routes
router.use('/users', require('./users.js'));
router.use('/posts', require('./posts.js'));
router.use('/comments', require('./comments.js'));

router.get('/', (req, res) => {
    model.Posts.allPosts().then(query => {
        res.render('index', {query: query })
    })
});

module.exports = router;

// Error Handling
