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

const createPost = (req, res) => {
    const { titulo, descripcion, fecha_creacion, categoria, autor_id } = req.body;
    const query = 'INSERT INTO posts (titulo, descripcion, fecha_creacion, categoria, autor_id) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [titulo, descripcion, fecha_creacion, categoria, autor_id], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(201).json({ message: 'Successfully created post', postId: results.insertId });
      }
    });
  };

const updatePost = (req, res) => {
    const postId = req.params.id;
    const { titulo, descripcion, fecha_creacion, categoria, autor_id } = req.body;
    const query = 'UPDATE posts SET titulo = ?, descripcion = ?, fecha_creacion = ?, categoria = ?, autor_id = ? WHERE id = ?';
  
    db.query(query, [titulo, descripcion, fecha_creacion, categoria, autor_id, postId], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json({ message: 'Successfully updated post' });
      }
    });
  };
  

  const deletePost = (req, res) => {
    const postId = req.params.id;
    const query = 'DELETE FROM posts WHERE id = ?';
  
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