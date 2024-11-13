const db = require('../config/db');

const getAllPosts = async (req, res) => {
    db.query('SELECT * FROM posts', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error obtaining posts' });
        } else {
            res.status(200).json(results);
        }
    });
};

const getPostById = async (req, res) => {
    const postId = req.params.id;
    db.query('SELECT * FROM posts WHERE id = ?', [postId], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error obtaining post' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

const createPost = async (req, res) => {
    const post = req.body;
    db.query('INSERT INTO posts SET ?', post, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error creating post' });
        } else {
            res.status(201).json(results);
        }
    });
};

const updatePost = async (req, res) => {
    const postId = req.params.id;
    const post = req.body;
    db.query('UPDATE posts SET ? WHERE id = ?', [post, postId], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error updating post' });
        } else {
            res.status(200).json(results);
        }
    });
};

const deletePost = async (req, res) => {
    const postId = req.params.id;
    db.query('DELETE FROM posts WHERE id = ?', [postId], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error deleting post' });
        } else {
            res.status(200).json(results);
        }
    });
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};