const db = require('../config/db');

const getAllAuthors = async (req, res) => {
    db.query('SELECT * FROM authors', (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json(results);
        }
    });
};

const getAuthorById = async (req, res) => {
    const authorId = req.params.id;
    db.query('SELECT * FROM authors WHERE id = ?', [authorId], (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Author not found' });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

const createAuthor = (req, res) => {
    const { nombre, email, imagen } = req.body;
    const query = 'INSERT INTO authors (nombre, email, imagen) VALUES (?, ?, ?)';
  
    db.query(query, [nombre, email, imagen], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(201).json({ message: 'Successfully created author', authorId: results.insertId });
      }
    });
  };
  

  const updateAuthor = (req, res) => {
    const authorId = req.params.id;
    const { nombre, email, imagen } = req.body;
    const query = 'UPDATE authors SET nombre = ?, email = ?, imagen = ? WHERE id = ?';
  
    db.query(query, [nombre, email, imagen, authorId], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json({ message: 'Successfully updated author' });
      }
    });
  };
  

  const deleteAuthor = (req, res) => {
    const authorId = req.params.id;
    const query = 'DELETE FROM authors WHERE id = ?';
  
    db.query(query, [authorId], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json({ message: 'Suiccessfully deleted author' });
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