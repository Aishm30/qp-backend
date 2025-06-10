// const express = require('express');
// const router = express.Router();
// const Comment = require('../models/Comment');
// const authenticateUser = require('../middleware/authenticateUser');

// router.post('/', authenticateUser, async (req, res) => {
//   try {
//     const { text } = req.body;
//     if (!text) {
//       return res.status(400).json({ message: 'Comment text is required' });
//     }

//     const newComment = new Comment({
//       text,
//       user: req.user.id,
//     });

//     const savedComment = await newComment.save();
//     const populatedComment = await Comment.findById(savedComment._id).populate('user', 'name');

//     res.status(201).json(populatedComment);
//   } catch (err) {
//     console.error('Error saving comment:', err);
//     res.status(500).json({ message: 'Server error while saving comment' });
//   }
// });

// router.get('/get-comments', async (req, res) => {
//   try {
//     const comments = await Comment.find()
//       .sort({ createdAt: -1 })
//       .populate({ path: 'user', select: 'name', strictPopulate: false });

//     res.status(200).json(comments);
//   } catch (err) {
//     console.error('Error fetching comments:', err.message, err.stack);
//     res.status(500).json({ message: 'Error fetching comments' });
//   }
// });

// module.exports = router;

// routes/commentRoutes.js

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { addComment, getAllComments } = require('../controllers/commentController');
const authenticateUser = require('../middleware/authenticateUser');

// POST /api/comments – Add a comment (requires login)
//router.post('/', authenticateUser, addComment);

router.post('/', authenticateUser, commentController.addComment); // ✅ token protected


// GET /api/comments/get-comments – Fetch all comments
router.get('/get-comments', getAllComments);

module.exports = router;
