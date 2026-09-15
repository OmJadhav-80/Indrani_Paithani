import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';

dotenv.config();

const app = express();

// Middleware Setup
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow during initial dev setup
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes Registration
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Indrani Paithani API Gateway',
    timestamp: new Date().toISOString(),
  });
});

// Database Connection & Server Listen
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/indrani_paithani';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Database for Indrani Paithani');
    app.listen(PORT, () => {
      console.log(`🚀 Indrani Paithani API Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB connection deferred (API running with mock fallback):', err.message);
    app.listen(PORT, () => {
      console.log(`🚀 Indrani Paithani Express Server listening on port ${PORT}`);
    });
  });
