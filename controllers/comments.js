// Declarations
const express = require('express');
const router = express.Router();
const model = require('../models');

// Comments Routes
router.post('/new/:id', (req, res) => {
    if ( req.session && req.body.comment ) {
        model.Comments.createComment(req.params.id, req.session, req.body).then(() => {
            res.redirect(`/posts/${req.params.id}`)
        })
    } else {
        res.send('error')
    }
});

module.exports = router;
