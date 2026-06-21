export const authMiddleware = (req, res, next) => {
  const userId = req.headers['x-user-id'];
  const userRole = req.headers['x-user-role'];

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Access Denied. User authentication credentials required."
    });
  }

  // Bind to request object
  req.user = {
    id: userId,
    role: userRole || 'User'
  };

  next();
};

export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden. Insufficient permissions."
      });
    }
    next();
  };
};
