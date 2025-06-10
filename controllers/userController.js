// // // controllers/userController.js

// // const User = require('../models/User');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');

// // // 📌 User Registration
// // exports.registerUser = async (req, res) => {
// //   try {
// //     console.log("📥 Received registration data:", req.body);

// //     const { name, email, password, confirmPassword } = req.body;

// //     // Validate required fields
// //     if (!name || !email || !password || !confirmPassword) {
// //       return res.status(400).json({ message: 'All fields (name, email, password, confirmPassword) are required.' });
// //     }

// //     if (password !== confirmPassword) {
// //       return res.status(400).json({ message: 'Passwords do not match.' });
// //     }

// //     // Check if user already exists
// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ message: 'User already exists with this email.' });
// //     }

// //     // Hash password
// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(password, salt);

// //     // Save new user
// //     const newUser = new User({ name, email, password: hashedPassword });
// //     await newUser.save();

// //     console.log("✅ User registered:", email);
// //     res.status(201).json({ message: 'User registered successfully.' });
// //   } catch (error) {
// //     console.error("❌ Registration Error:", error);
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // };

// // // 📌 User Login
// // exports.loginUser = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     // Validate required fields
// //     if (!email || !password) {
// //       return res.status(400).json({ message: 'Email and password are required.' });
// //     }

// //     // Find user by email
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(401).json({ message: 'Invalid email or password.' });
// //     }

// //     // Compare passwords
// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(401).json({ message: 'Invalid email or password.' });
// //     }

// //     // Generate JWT token
// //     const token = jwt.sign(
// //       { id: user._id, email: user.email },
// //       process.env.JWT_SECRET,
// //       { expiresIn: '1d' }
// //     );

// //     console.log("✅ User logged in:", email);
// //     // Return token and user info
// //     res.status(200).json({
// //       token,
// //       user: {
// //         id: user._id,
// //         name: user.name,
// //         email: user.email,
// //         role: user.role // if you have a role field
// //       }
// //     });
// //   } catch (error) {
// //     console.error("❌ Login Error:", error);
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // };

// // controllers/userController.js

// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // 📌 Register User
// exports.registerUser = async (req, res) => {
//   try {
//     console.log("📥 Registration Request:", req.body);

//     const { name, email, password, confirmPassword } = req.body;

//     // Validation
//     if (!name || !email || !password || !confirmPassword) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match.' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already in use.' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     console.log("✅ User Registered:", email);
//     res.status(201).json({ message: 'User registered successfully.' });

//   } catch (error) {
//     console.error("❌ Registration Error:", error.message);
//     res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// };

// // 📌 Login User
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required.' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password.' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid email or password.' });
//     }

//     // ✅ JWT Payload
//     const payload = {
//       id: user._id,
//       email: user.email,
//     };

//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

//     console.log("✅ Login Successful for:", email);

//     res.status(200).json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role || 'user' // default to 'user' if not set
//       }
//     });

//   } catch (error) {
//     console.error("❌ Login Error:", error.message);
//     res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// };
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 📌 User Registration
exports.registerUser = async (req, res) => {
  try {
    console.log("📥 Received registration data:", req.body);

    const { name, email, password, confirmPassword } = req.body;

    // Validate required fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields (name, email, password, confirmPassword) are required.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    console.log("✅ User registered:", email);
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 📌 User Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log("✅ User logged in:", email);

    // ✅ Return token and user info
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || 'user'
      }
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
