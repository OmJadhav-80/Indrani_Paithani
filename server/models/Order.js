import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  title: String,
  color: String,
  price: Number,
  quantity: Number,
  image: String,
});

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [OrderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['Razorpay', 'Cashfree', 'Cash on Delivery'],
      default: 'Razorpay',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending',
    },
    status: {
      type: String,
      enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Processing',
    },
    trackingNumber: String,
    courier: String,
    trackingUrl: String,
    shippingAddress: {
      fullName: String,
      phone: String,
      flat: String,
      street: String,
      landmark: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', OrderSchema);
