const express = require('express');
const postsRoutes = require('./postsRoutes');
const authorsRoutes = require('./authorsRoutes');

const router = express.Router();

router.use('/posts', postsRoutes);
router.use('/authors', authorsRoutes);

module.exports = router;