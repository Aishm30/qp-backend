// const Comment = require('../models/Comment');

// // ✅ Add a new comment (secure)
// exports.addComment = async (req, res) => {
//   try {
//     const userId = req.user._id;  // ✅ Take userId from decoded token
//     const { text } = req.body;

//     if (!text) {
//       return res.status(400).json({ message: 'Comment text is required' });
//     }

//     const newComment = new Comment({ userId, text });
//     await newComment.save();

//     res.status(201).json({
//       message: 'Comment added successfully',
//       comment: newComment,
//     });
//   } catch (error) {
//     console.error('Add comment error:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // ✅ Get all comments with user info
// exports.getAllComments = async (req, res) => {
//   try {
//     const comments = await Comment.find()
//       .populate('userId', 'name email')
//       .sort({ createdAt: -1 });

//     res.json(comments);
//   } catch (error) {
//     console.error('Get comments error:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user._id;

    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const newComment = new Comment({ userId, text });
    await newComment.save();

    const populatedComment = await newComment.populate('userId', 'name email');
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
