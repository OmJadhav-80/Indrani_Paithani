import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_indrani_paithani_2026';

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
};

// Helper to send HTTP-Only cookie & token response
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id || user.id);

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  };

  const userObj = user.toObject ? user.toObject() : { ...user };
  delete userObj.password;
  delete userObj.resetPasswordToken;
  delete userObj.resetPasswordExpires;

  // Ensure fullName virtual is populated
  userObj.fullName = userObj.fullName || `${userObj.firstName || ''} ${userObj.lastName || ''}`.trim();

  res
    .status(statusCode)
    .cookie('token', token, cookieOptions)
    .json({
      success: true,
      token,
      user: userObj,
    });
};

/**
 * @route   POST /api/users/register
 * @desc    Register a new customer account
 * @access  Public
 */
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (first name, last name, email, password).',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check duplicate account
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please login instead.',
      });
    }

    // Always enforce default role CUSTOMER for security
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : '',
      password,
      authProvider: 'email',
      role: 'CUSTOMER',
      accountStatus: 'Active',
      lastLoginAt: new Date(),
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Server error during registration.',
    });
  }
});

/**
 * @route   POST /api/users/login
 * @desc    Authenticate user with Email & Password
 * @access  Public
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please enter both your email address and password.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email address or password.',
      });
    }

    // If account suspended
    if (user.accountStatus === 'Suspended') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended. Please contact customer support.',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email address or password.',
      });
    }

    // If logging into Owner portal, verify role
    if (role === 'OWNER' && user.role !== 'OWNER' && user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You do not have owner/administrative privileges.',
      });
    }

    user.lastLoginAt = new Date();
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication.',
    });
  }
});

/**
 * @route   POST /api/users/google
 * @desc    Authenticate or register user via Google OAuth
 * @access  Public
 */
router.post('/google', async (req, res) => {
  try {
    const { email, firstName, lastName, googleId, profilePhoto } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Google authentication failed: Email address was not provided.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    let user = await User.findOne({ $or: [{ googleId }, { email: cleanEmail }] });

    if (user) {
      // Sync Google info if needed
      user.lastLoginAt = new Date();
      if (!user.googleId) user.googleId = googleId || '';
      if (!user.profilePhoto && profilePhoto) user.profilePhoto = profilePhoto;
      if (user.authProvider !== 'google' && !user.authProvider) user.authProvider = 'google';
      await user.save();
    } else {
      // Create new Google customer
      user = await User.create({
        firstName: (firstName || cleanEmail.split('@')[0]).trim(),
        lastName: (lastName || 'User').trim(),
        email: cleanEmail,
        googleId: googleId || '',
        profilePhoto: profilePhoto || '',
        authProvider: 'google',
        role: 'CUSTOMER',
        accountStatus: 'Active',
        emailVerified: true,
        lastLoginAt: new Date(),
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error('Google Auth Error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during Google authentication.',
    });
  }
});

/**
 * @route   GET /api/users/me
 * @desc    Get currently logged in user profile
 * @access  Private
 */
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('wishlist');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    const userObj = user.toObject();
    userObj.fullName = `${user.firstName} ${user.lastName}`.trim();
    res.json({ success: true, user: userObj });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching user session.' });
  }
});

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile (First Name, Last Name, Phone, Profile Photo)
 * @access  Private
 */
router.put('/profile', protect, async (req, res) => {
  try {
    const { firstName, lastName, phone, profilePhoto } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User profile not found.' });
    }

    // Update editable fields
    if (firstName) user.firstName = firstName.trim();
    if (lastName) user.lastName = lastName.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (profilePhoto !== undefined) user.profilePhoto = profilePhoto;

    await user.save();

    const userObj = user.toObject();
    userObj.fullName = `${user.firstName} ${user.lastName}`.trim();

    res.json({
      success: true,
      message: 'Profile updated successfully!',
      user: userObj,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error updating profile.' });
  }
});

/**
 * @route   POST /api/users/addresses
 * @desc    Add delivery address
 * @access  Private
 */
router.post('/addresses', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    const newAddress = req.body;
    if (newAddress.isDefault || user.addresses.length === 0) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
      newAddress.isDefault = true;
    }

    user.addresses.push(newAddress);
    await user.save();

    res.status(201).json({ success: true, addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Error adding address.' });
  }
});

/**
 * @route   PUT /api/users/addresses/:addressId
 * @desc    Edit saved address
 * @access  Private
 */
router.put('/addresses/:addressId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    const address = user.addresses.id(req.params.addressId);
    if (!address) return res.status(404).json({ success: false, message: 'Address not found.' });

    if (req.body.isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    Object.assign(address, req.body);
    await user.save();

    res.json({ success: true, addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating address.' });
  }
});

/**
 * @route   DELETE /api/users/addresses/:addressId
 * @desc    Delete saved address
 * @access  Private
 */
router.delete('/addresses/:addressId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    user.addresses.pull({ _id: req.params.addressId });
    if (user.addresses.length > 0 && !user.addresses.some((a) => a.isDefault)) {
      user.addresses[0].isDefault = true;
    }
    await user.save();

    res.json({ success: true, addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting address.' });
  }
});

/**
 * @route   PUT /api/users/addresses/:addressId/default
 * @desc    Set address as default
 * @access  Private
 */
router.put('/addresses/:addressId/default', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    user.addresses.forEach((addr) => {
      addr.isDefault = addr._id.toString() === req.params.addressId;
    });

    await user.save();
    res.json({ success: true, addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error setting default address.' });
  }
});

/**
 * @route   POST /api/users/forgot-password
 * @desc    Request password reset link
 * @access  Public
 */
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please enter your email address.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail });

    if (user) {
      // Generate 20-byte random reset token
      const resetToken = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
      await user.save();
    }

    // Always return safe generic message (Requirement Section 14)
    res.json({
      success: true,
      message: 'If an account exists for this email, a password reset link has been sent.',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error processing forgot password.' });
  }
});

/**
 * @route   POST /api/users/reset-password
 * @desc    Reset password using valid reset token
 * @access  Public
 */
router.post('/reset-password', async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
      return res.status(400).json({ success: false, message: 'Invalid or missing reset parameters.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Password reset token is invalid or has expired.' });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ success: true, message: 'Password has been reset successfully! You can now log in.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error resetting password.' });
  }
});

/**
 * @route   POST /api/users/logout
 * @desc    Logout user & clear cookie
 * @access  Public
 */
router.post('/logout', (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.json({ success: true, message: 'Logged out successfully.' });
});

export default router;
