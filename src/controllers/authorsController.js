const db = require('../config/db');

const getAllAuthors = async (req, res) => {
    db.query('SELECT * FROM authors', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error obtaining authors' });
        } else {
            res.status(200).json(results);
        }
    });
};

const getAuthorById = async (req, res) => {
    const authorId = req.params.id;
    db.query('SELECT * FROM authors WHERE id = ?', [authorId], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error obtaining author' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Author not found' });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

const createAuthor = async (req, res) => {
    const author = req.body;
    db.query('INSERT INTO authors SET ?', author, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error creating author' });
        } else {
            res.status(201).json(results);
        }
    });
};

const updateAuthor = async (req, res) => {
    const authorId = req.params.id;
    const author = req.body;
    db.query('UPDATE authors SET ? WHERE id = ?', [author, authorId], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error updating author' });
        } else {
            res.status(200).json(results);
        }
    });
};

const deleteAuthor = async (req, res) => {
    const authorId = req.params.id;
    db.query('DELETE FROM authors WHERE id = ?', [authorId], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error deleting author' });
        } else {
            res.status(200).json(results);
        }
    });
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
};