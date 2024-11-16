const db = require('../config/db');

const getAllPosts = () => {
    const query = `SELECT 
        post.idpost, 
        post.title, 
        post.description, 
        post.date, 
        post.category, 
        author.idauthor AS author_id, 
        author.name, 
        author.email, 
        author.photo 
        FROM post JOIN author ON post.author_idauthor = author.idauthor`;
    
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

const getPostById = (postId) => {
    const query = `SELECT 
        post.idpost, 
        post.title, 
        post.description, 
        post.date, 
        post.category, 
        author.idauthor AS author_id, 
        author.name, 
        author.email, 
        author.photo 
        FROM post JOIN author ON post.author_idauthor = author.idauthor WHERE post.idpost = ?`;

    return new Promise((resolve, reject) => {
        db.query(query, [postId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
};

const getPostsByAuthor = (authorId) => {
    const query = `
        SELECT 
            post.idpost, 
            post.title, 
            post.description, 
            post.date, 
            post.category, 
            author.idauthor AS author_id, 
            author.name, 
            author.email, 
            author.photo 
        FROM post JOIN author ON post.author_idauthor = author.idauthor WHERE author.idauthor = ?`;

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

const createPost = (title, description, date, category, author_idauthor) => {
    const query = 'INSERT INTO post (title, description, date, category, author_idauthor) VALUES (?, ?, ?, ?, ?)';
    
    return new Promise((resolve, reject) => {
        db.query(query, [title, description, date, category, author_idauthor], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.insertId);
            }
        });
    });
};

const updatePost = (postId, title, description, date, category, author_idauthor) => {
    const query = 'UPDATE post SET title = ?, description = ?, date = ?, category = ?, author_idauthor = ? WHERE idPost = ?';
    
    return new Promise((resolve, reject) => {
        db.query(query, [title, description, date, category, author_idauthor, postId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const deletePost = (postId) => {
    const query = 'DELETE FROM post WHERE idpost = ?';
    
    return new Promise((resolve, reject) => {
        db.query(query, [postId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    getAllPosts,
    getPostById,
    getPostsByAuthor,
    createPost,
    updatePost,
    deletePost,
};