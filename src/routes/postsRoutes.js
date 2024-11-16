const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.get('/view-posts-by-author/:id', postsController.getPostsByAuthor);
router.post('/create-post', postsController.createPost);
router.put('/update-post/:id', postsController.updatePost);
router.delete('/delete-post/:id', postsController.deletePost);

module.exports = router;