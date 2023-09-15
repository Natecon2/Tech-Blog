const { Post, User, Comment } = require('../models');

const postController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
            attributes: ['content'],
          },
        ],
      });
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  createPost: async (req, res) => {
    try {
      // Retrieve data from request body
      const { title, content, user_id } = req.body;

      // Create a new post
      const newPost = await Post.create({
        title,
        content,
        user_id,
      });

      res.json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  updatePost: async (req, res) => {
    try {
      // Retrieve data from request body
      const { title, content } = req.body;

      // Get post ID from request parameters
      const { postId } = req.params;

      // Find the post by ID and update its title and content
      const updatedPost = await Post.update(
        { title, content },
        { where: { id: postId } }
      );

      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  deletePost: async (req, res) => {
    try {
      // Get post ID from request parameters
      const { postId } = req.params;

      // Delete the post by ID
      await Post.destroy({ where: { id: postId } });

      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },
};

module.exports = postController;
