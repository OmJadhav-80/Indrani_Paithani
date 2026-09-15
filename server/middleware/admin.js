/**
 * Admin Authorization Middleware for Indrani Paithani REST API
 * Verifies that the authenticated user has administrative privileges
 */
export const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Administrative authorization required.'
    });
  }
  next();
};
