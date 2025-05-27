const express = require('express');
const router = express.Router();
const multer = require('multer');
const QuestionPaper = require('../models/QuestionPaper');

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// POST - Upload QP
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { subject, semester, year } = req.body;
    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    const qp = new QuestionPaper({ subject, semester, year, fileUrl });
    await qp.save();
    res.status(201).json(qp);
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ message: 'Failed to upload question paper' });
  }
});

// GET - All QPs
router.get('/', async (req, res) => {
  try {
    const qps = await QuestionPaper.find();
    res.json(qps);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch question papers' });
  }
});

// DELETE - QP by ID
router.delete('/:id', async (req, res) => {
  try {
    await QuestionPaper.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete question paper' });
  }
});

module.exports = router;
