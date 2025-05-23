const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  createQuestionPaper,
  getAllQuestionPapers,
  deleteQuestionPaper
} = require('../controllers/questionPaperController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Routes
router.post('/', upload.single('file'), createQuestionPaper);
router.get('/', getAllQuestionPapers);
router.delete('/:id', deleteQuestionPaper);

module.exports = router;
