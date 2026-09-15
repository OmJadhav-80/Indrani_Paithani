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
    originalPrice: {
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
