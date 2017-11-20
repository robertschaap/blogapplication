// Declarations
const express = require('express');
const router = express.Router();

// Routes
// router.use('/users', require('./users.js'));
// router.use('/posts', require('./posts.js'));

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;


/*
- \
- \users [display all]
- \users\new [create new]
- \users\:id [see one]
- \posts [display all]
- \posts\new [create new]
- \posts\:id [see one]

- \login
- \logout
*/
