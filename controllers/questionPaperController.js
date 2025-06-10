const QuestionPaper = require('../models/QuestionPaper');
const path = require('path');

// Create a new question paper
exports.createQuestionPaper = async (req, res) => {
  try {
    const { subject, semester, year } = req.body; // ✅ include year
    let fileUrl = '';

    if (req.file) {
      fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    } else if (req.body.fileUrl) {
      fileUrl = req.body.fileUrl;
    }

    // ✅ Validate all required fields
    if (!subject || !semester || !year || !fileUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newPaper = new QuestionPaper({
  subject: req.body.subject,       // your frontend sends subject, semester, year
  semester: req.body.semester,
  year: req.body.year,
  fileUrl: file.path,              // <-- use fileUrl instead of filePath
});


    await qp.save();
    res.status(201).json(qp);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all question papers
exports.getAllQuestionPapers = async (req, res) => {
  try {
    const qps = await QuestionPaper.find().sort({ uploadedAt: -1 });
    res.json(qps);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a question paper by ID
exports.deleteQuestionPaper = async (req, res) => {
  try {
    await QuestionPaper.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question paper deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
