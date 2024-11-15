const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/view-posts', postsController.getAllPosts);
router.get('/view-posts/:id', postsController.getPostById);
router.post('/create-post', postsController.createPost);
router.put('/update-post/:id', postsController.updatePost);
router.delete('/delete-post/:id', postsController.deletePost);

module.exports = router;