import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_indrani_paithani_2026';

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
};

// Helper to send HTTP-Only cookie response
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  };

  // Convert mongoose doc to object and sanitize password
  const userObj = user.toObject();
  delete userObj.password;

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
 * @desc    Register a new user with personal details, address & preferences
 * @access  Public
 */
router.post('/register', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      altPhone,
      gender,
      dob,
      anniversaryDate,
      password,
      address,
      whatsappUpdates,
      promotionalOffers,
    } = req.body;

    // Check existing email or phone
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address or mobile phone number already exists.',
      });
    }

    // Format initial address if provided
    const initialAddresses = address
      ? [
          {
            label: 'Home',
            fullName: `${firstName} ${lastName}`,
            phone: phone,
            flat: address.flat,
            street: address.street,
            landmark: address.landmark || '',
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            country: address.country || 'India',
            isDefault: true,
          },
        ]
      : [];

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      altPhone,
      gender,
      dob: dob ? new Date(dob) : null,
      anniversaryDate: anniversaryDate ? new Date(anniversaryDate) : null,
      password,
      addresses: initialAddresses,
      preferences: {
        whatsappUpdates: !!whatsappUpdates,
        promotionalOffers: !!promotionalOffers,
      },
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ success: false, message: err.message || 'Server error during registration.' });
  }
});

/**
 * @route   POST /api/users/login
 * @desc    Authenticate user & issue HTTP-Only JWT cookie
 * @access  Public
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email address or password.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email address or password.' });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
});

/**
 * @route   GET /api/users/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching profile.' });
  }
});

/**
 * @route   PUT /api/users/profile
 * @desc    Update user personal details
 * @access  Private
 */
router.put('/profile', protect, async (req, res) => {
  try {
    const allowedFields = ['firstName', 'lastName', 'phone', 'altPhone', 'gender', 'dob', 'anniversaryDate', 'preferences'];
    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(req.userId, updateData, { new: true, runValidators: true });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error updating profile.' });
  }
});

/**
 * @route   POST /api/users/addresses
 * @desc    Add a new delivery address card
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
 * @desc    Edit existing address card
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
 * @desc    Delete a saved address
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
 * @desc    Set an address as default
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
 * @route   PUT /api/users/change-password
 * @desc    Change user password
 * @access  Private
 */
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.userId).select('+password');

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: 'Password updated successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating password.' });
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
