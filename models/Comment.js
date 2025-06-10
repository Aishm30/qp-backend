// // const mongoose = require('mongoose');

// // const commentSchema = new mongoose.Schema(
// //   {
// //     text: {
// //       type: String,
// //       required: true,
// //     },
// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: 'User', // This references the User model
// //       required: true,
// //     },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model('Comment', commentSchema);

// // models/Comment.js

// const mongoose = require('mongoose');

// const commentSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     username: {
//       type: String,
//       required: true,
//     },
//     text: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Comment', commentSchema);

// const mongoose = require('mongoose');

// const commentSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     text: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Comment', commentSchema);

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
