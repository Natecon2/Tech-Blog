const router = require('express').Router();
const commentController = require('../controllers/commentController');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');

// Define your routes here
router.get('/comments', commentController.getAllComments);
router.post('/comments', commentController.createComment);
router.put('/comments/:commentId', commentController.updateComment);
router.delete('/comments/:commentId', commentController.deleteComment);

router.get('/posts', postController.getAllPosts);
router.post('/posts', postController.createPost);
router.put('/posts/:postId', postController.updatePost);
router.delete('/posts/:postId', postController.deletePost);

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
