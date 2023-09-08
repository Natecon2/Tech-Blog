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

  // Add route handlers for creating, updating, and deleting posts here
};

module.exports = postController;
