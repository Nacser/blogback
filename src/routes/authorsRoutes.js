const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authorsController');

router.get('/', authorsController.getAllAuthors);
router.get('/:id', authorsController.getAuthorById);
router.post('/create-author', authorsController.createAuthor);
router.put('/update-author/:id', authorsController.updateAuthor);
router.delete('/delete-author/:id', authorsController.deleteAuthor);

module.exports = router;