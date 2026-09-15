/**
 * Admin / Owner Authorization Middleware for Indrani Paithani REST API
 * Verifies that the authenticated user has OWNER or ADMIN privileges
 */
export const authorizeAdmin = (req, res, next) => {
  const role = req.user ? req.user.role : req.role;
  if (!role || (role !== 'OWNER' && role !== 'ADMIN' && role !== 'admin')) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Owner or administrative authorization required.'
    });
  }
  next();
};
