const db = require('../config/db');

const getAllPosts = async (req, res) => {
   
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

    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json(results);
        }
    });
};

const getPostById = async (req, res) => {
    const postId = req.params.id;
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

    db.query(query, [postId], (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

const createPost = (req, res) => {
    const { title, description, date, category, author_idauthor } = req.body;
    const query = 'INSERT INTO post (title, description, date, category, author_idauthor) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [title, description, date, category, author_idauthor], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(201).json({ message: 'Successfully created post', idpost: results.insertId });
      }
    });
  };

const updatePost = (req, res) => {
    const postId = req.params.id;
    const { title, description, date, category, author_idauthor } = req.body;
    const query = 'UPDATE post SET title = ?, description = ?, date = ?, category = ?, author_idauthor = ? WHERE idPost = ?';
  
    db.query(query, [title, description, date, category, author_idauthor, postId], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json({ message: 'Successfully updated post' });
      }
    });
  };
  

  const deletePost = (req, res) => {
    const postId = req.params.id;
    const query = 'DELETE FROM post WHERE idpost = ?';
  
    db.query(query, [postId], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json({ message: 'Successfully deleted post' });
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