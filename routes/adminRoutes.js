const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const authenticateAdmin = require('../middleware/authenticateAdmin');
const adminController = require('../controllers/adminController');
const checkAdminLoginKey = require('../middleware/checkAdminLoginKey');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage });

router.post('/login', checkAdminLoginKey, adminController.adminLogin);


// Protect all routes below
router.use(authenticateAdmin);

router.post('/question-papers', upload.single('file'), adminController.addQuestionPaper);
router.get('/question-papers', adminController.getQuestionPapers);
//router.put('/question-papers/:id', adminController.updateQuestionPaper);
router.delete('/question-papers/:id', adminController.deleteQuestionPaper);
router.get('/comments', adminController.getComments);
//router.get('/comments', authenticateAdmin, adminController.getComments);

console.log(typeof checkAdminLoginKey); // should be 'function'
console.log(typeof adminController.adminLogin); // should be 'function'

module.exports = router;
