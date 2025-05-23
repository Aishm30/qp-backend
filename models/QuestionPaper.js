const mongoose = require('mongoose');

const questionPaperSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  year: {
    type: Number, // ✅ Add this field
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('QuestionPaper', questionPaperSchema);
