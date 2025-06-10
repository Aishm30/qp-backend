const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const QuestionPaper = require('../models/QuestionPaper');
const Comment = require('../models/Comment');

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add question paper
const addQuestionPaper = async (req, res) => {
  try {
    const { subject, year, semester } = req.body;
    const file = req.file;

    if (!subject || !year || !semester || !file) {
      return res.status(400).json({ message: 'All fields and file are required' });
    }

    // Construct accessible URL for the file
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;

    const newPaper = new QuestionPaper({
      subject,
      year,
      semester,
      fileUrl,         // <-- use fileUrl (matches schema)
    });

    await newPaper.save();

    res.status(201).json({ message: 'Question paper added', paper: newPaper });
  } catch (error) {
    console.error('Add QP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all question papers
const getQuestionPapers = async (req, res) => {
  try {
    const papers = await QuestionPaper.find().sort({ uploadedAt: -1 }); // use uploadedAt or createdAt based on schema
    res.json(papers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a question paper
const deleteQuestionPaper = async (req, res) => {
  try {
    const { id } = req.params;
    await QuestionPaper.findByIdAndDelete(id);
    res.json({ message: 'Question paper deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user comments
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  adminLogin,
  addQuestionPaper,
  getQuestionPapers,
  deleteQuestionPaper,
  getComments,
};
