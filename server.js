const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const questionPaperRoutes = require('./routes/questionPaperRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Use routes
app.use('/api/qp', questionPaperRoutes);         // Question papers routes
app.use('/api/comments', commentRoutes);         // ✅ Comments route now fixed
app.use('/api/users', userRoutes);               // User routes
app.use('/api/admin', adminRoutes);              // Admin routes

// Connect to MongoDB and start the server
const mongoURI = process.env.MONGO_URI;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
