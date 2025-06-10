// routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

/**
 * POST /api/users/register
 * Registers a new user (stores in MongoDB).
 */
router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user', // default role; adjust if you create admins separately
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

/**
 * POST /api/users/login
 * Logs in an existing user. On success, sets an HTTP-only cookie “token”.
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Create JWT payload including user ID and role
    const tokenPayload = {
      id: user._id,
      email: user.email,
      role: 'user',
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Set the token as an HTTP-only cookie
    res
      .status(200)
      .json({
        message: 'Login successful!',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token 
      });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

/**
 * POST /api/users/logout
 * Clears the “token” cookie so the user is logged out.
 */
router.post('/logout', (req, res) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    })
    .json({ message: 'Logged out successfully' });
});

module.exports = router;
