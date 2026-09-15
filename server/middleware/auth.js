import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Check HTTP-Only cookie 'token'
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } 
  // 2. Fallback check Authorization Bearer Header
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token || token === 'none') {
    return res.status(401).json({ success: false, message: 'Access denied. Please log in to proceed.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_jwt_key_indrani_paithani_2026');
    req.userId = decoded.id;

    // Attach full user document if connected to DB
    if (User.db && User.db.readyState === 1) {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ success: false, message: 'User account no longer exists.' });
      }
      req.user = user;
    }

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token.' });
  }
};
