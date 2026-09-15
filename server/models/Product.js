import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Yeola Paithani', 'Maharani', 'Tissue Silk', 'Semi-Paithani'],
    },
    collection: {
      type: String,
      enum: ['Bridal Collection', 'Festival Collection', 'Traditional Collection', 'General Collection'],
      default: 'General Collection',
    },
    fabric: {
      type: String,
      required: true,
    },
    zariType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    compareAtPrice: {
      type: Number,
      min: 0,
    },
    discountPercent: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stockQuantity: {
      type: Number,
      default: 10,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    colors: [
      {
        name: String,
        hex: String,
      },
    ],
    occasion: {
      type: String,
      enum: ['Bridal', 'Festive', 'Casual'],
      default: 'Bridal',
    },
    borderStyle: String,
    blousePiece: String,
    washCare: String,
    handloomCertified: {
      type: Boolean,
      default: true,
    },
    silkMarkCertified: {
      type: Boolean,
      default: true,
    },
    images: [String],
    description: String,
    specs: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', ProductSchema);
