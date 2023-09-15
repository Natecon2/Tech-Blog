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

  createComment: async (req, res) => {
    try {
      // Retrieve data from request body (e.g., content, user_id, post_id)
      const { content, user_id, post_id } = req.body;

      // Create a new comment
      const newComment = await Comment.create({
        content,
        user_id,
        post_id,
      });

      res.json(newComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  updateComment: async (req, res) => {
    try {
      // Retrieve data from request body (e.g., content)
      const { content } = req.body;

      // Get comment ID from request parameters
      const { commentId } = req.params;

      // Find the comment by ID and update its content
      const updatedComment = await Comment.update(
        { content },
        { where: { id: commentId } }
      );

      res.json(updatedComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  deleteComment: async (req, res) => {
    try {
      // Get comment ID from request parameters
      const { commentId } = req.params;

      // Delete the comment by ID
      await Comment.destroy({ where: { id: commentId } });

      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },
};

module.exports = commentController;
