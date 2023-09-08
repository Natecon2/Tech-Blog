const { Comment, User, Post } = require('../models');

const commentController = {
  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Post,
            attributes: ['title'],
          },
        ],
      });
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Add route handlers for creating, updating, and deleting comments here
};

module.exports = commentController;
