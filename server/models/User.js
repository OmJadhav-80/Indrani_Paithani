import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Address Subdocument Schema
const AddressSchema = new mongoose.Schema(
  {
    addressType: {
      type: String,
      enum: ['Home', 'Work', 'Other'],
      default: 'Home',
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required for shipping address'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required for shipping address'],
      trim: true,
    },
    flat: {
      type: String,
      required: [true, 'Address Line 1 (Flat/House No) is required'],
      trim: true,
    },
    street: {
      type: String,
      required: [true, 'Address Line 2 (Street/Area) is required'],
      trim: true,
    },
    landmark: {
      type: String,
      trim: true,
      default: '',
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    pincode: {
      type: String,
      required: [true, 'PIN code is required'],
      match: [/^\d{6}$/, 'Please enter a valid 6-digit PIN code'],
    },
    country: {
      type: String,
      default: 'India',
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Main User Schema
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    profilePhoto: {
      type: String,
      default: '',
    },
    authProvider: {
      type: String,
      enum: ['email', 'google'],
      default: 'email',
    },
    googleId: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      select: false, // Exclude password field by default on queries
    },
    role: {
      type: String,
      enum: ['CUSTOMER', 'OWNER', 'ADMIN'],
      default: 'CUSTOMER',
    },
    accountStatus: {
      type: String,
      enum: ['Active', 'Suspended', 'Pending'],
      default: 'Active',
    },
    lastLoginAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
      select: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    addresses: [AddressSchema],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual property for Full Name
UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`.trim();
});

// Pre-save Middleware: Hash Password before saving if modified
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance Method: Compare input password with stored hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', UserSchema);
