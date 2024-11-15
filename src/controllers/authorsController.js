const db = require('../config/db');

const getAllAuthors = async (req, res) => {
    db.query('SELECT * FROM author', (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json(results);
        }
    });
};

const getAuthorById = async (req, res) => {
    const authorId = req.params.id;
    db.query('SELECT * FROM author WHERE idauthor = ?', [authorId], (error, results) => {
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
    const { name, email, photo } = req.body;
    const query = 'INSERT INTO author (name, email, photo) VALUES (?, ?, ?)';
  
    db.query(query, [name, email, photo], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(201).json({ message: 'Successfully created author', idauthor: results.insertId });
      }
    });
  };
  

  const updateAuthor = (req, res) => {
    const authorId = req.params.id;
    const { name, email, photo } = req.body;
    const query = 'UPDATE author SET name = ?, email = ?, photo = ? WHERE idauthor = ?';
  
    db.query(query, [name, email, photo, authorId], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json({ message: 'Successfully updated author' });
      }
    });
  };
  

  const deleteAuthor = (req, res) => {
    const authorId = req.params.id;
    const query = 'DELETE FROM author WHERE idauthor = ?';
  
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