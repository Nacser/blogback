const Post = require('../models/postsModels');


const getAllPosts = async (req, res) => {
  try {
      const posts = await Post.getAllPosts();
      res.status(200).json(posts);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;
  try {
      const post = await Post.getPostById(postId);
      if (!post) {
          res.status(404).json({ error: 'Post not found' });
      } else {
          res.status(200).json(post);
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getPostsByAuthor = async (req, res) => {
    const authorId = req.params.id;

    try {
        const { authorExists, posts } = await Post.getPostsByAuthor(authorId);

        if (!authorExists) {
            return res.status(404).json({ message: 'Author not found' });
        }

        if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this author' });
        }

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createPost = async (req, res) => {
  const { title, description, date, category, author_idauthor } = req.body;
  try {
      const postId = await Post.createPost(title, description, date, category, author_idauthor);
      res.status(201).json({ message: 'Successfully created post', idpost: postId });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, description, date, category, author_idauthor } = req.body;
  try {
      await Post.updatePost(postId, title, description, date, category, author_idauthor);
      res.status(200).json({ message: 'Successfully updated post' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
  

const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
      await Post.deletePost(postId);
      res.status(200).json({ message: 'Successfully deleted post' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
  



module.exports = {
    getAllPosts,
    getPostById,
    getPostsByAuthor,
    createPost,
    updatePost,
    deletePost,
};