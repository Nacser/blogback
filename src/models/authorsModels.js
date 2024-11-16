const db = require('../config/db');

const getAllAuthors = () => {
    const query = 'SELECT * FROM author';
    
    return new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const getAuthorById = (authorId) => {
    const query = 'SELECT * FROM author WHERE idauthor = ?';

    return new Promise((resolve, reject) => {
        db.query(query, [authorId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
};

const createAuthor = (name, email, photo) => {
    const query = 'INSERT INTO author (name, email, photo) VALUES (?, ?, ?)';
    
    return new Promise((resolve, reject) => {
        db.query(query, [name, email, photo], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.insertId);
            }
        });
    });
};

const updateAuthor = (authorId, name, email, photo) => {
    const query = 'UPDATE author SET name = ?, email = ?, photo = ? WHERE idauthor = ?';
    
    return new Promise((resolve, reject) => {
        db.query(query, [name, email, photo, authorId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const deleteAuthor = (authorId) => {
    const query = 'DELETE FROM author WHERE idauthor = ?';
    
    return new Promise((resolve, reject) => {
        db.query(query, [authorId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
};