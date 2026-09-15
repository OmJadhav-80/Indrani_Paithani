import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Address Subdocument Schema
const AddressSchema = new mongoose.Schema(
  {
    label: {
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
      required: [true, 'Flat / House No. is required'],
      trim: true,
    },
    street: {
      type: String,
      required: [true, 'Street / Area name is required'],
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
      required: [true, 'Pincode is required'],
      match: [/^\d{6}$/, 'Please enter a valid 6-digit Indian pincode'],
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
      required: [true, 'Mobile phone is required'],
      unique: true,
      trim: true,
    },
    altPhone: {
      type: String,
      trim: true,
      default: '',
    },
    gender: {
      type: String,
      enum: ['Female', 'Male', 'Other', 'Prefer not to say'],
      default: 'Female',
    },
    dob: {
      type: Date,
      default: null,
    },
    anniversaryDate: {
      type: Date,
      default: null,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Exclude password field by default on queries
    },
    role: {
      type: String,
      enum: ['CUSTOMER', 'OWNER'],
      default: 'CUSTOMER',
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    phoneVerified: {
      type: Boolean,
      default: true,
    },
    preferences: {
      whatsappUpdates: {
        type: Boolean,
        default: true,
      },
      promotionalOffers: {
        type: Boolean,
        default: true,
      },
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
  }
);

// Pre-save Middleware: Hash Password before saving if modified
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
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
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', UserSchema);
