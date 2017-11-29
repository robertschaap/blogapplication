// Declarations
const express = require('express');
const router = express.Router();
const model = require('../models');

// Routes
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

router.get('/', (req, res) => {
    model.Posts.allPosts( 'All Posts' ).then(query => {
        res.render('index', {query: query });
    });
});

module.exports = router;

// Error Handling
