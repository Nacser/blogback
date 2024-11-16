const Author = require('../models/authorsModels');

const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.getAllAuthors();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAuthorById = async (req, res) => { 
    const authorId = req.params.id;
    try {
        const author = await Author.getAuthorById(authorId);
        if (!author) {
            res.status(404).json({ error: 'Author not found' });
        } else {
            res.status(200).json(author);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createAuthor = async (req, res) => {
    const { name, email, photo } = req.body;
    try {
        const authorId = await Author.createAuthor(name, email, photo);
        res.status(201).json({ message: 'Successfully created author', idauthor: authorId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
const updateAuthor = async (req, res) => {
    const authorId = req.params.id;
    const { name, email, photo } = req.body;
    try {
        await Author.updateAuthor(authorId, name, email, photo);
        res.status(200).json({ message: 'Successfully updated author' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
const deleteAuthor = async (req, res) => {
    const authorId = req.params.id;
    try {
        await Author.deleteAuthor(authorId);
        res.status(200).json({ message: 'Suiccessfully deleted author' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
};