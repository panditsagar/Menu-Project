import jwt from "jsonwebtoken";

// Middleware to protect admin routes
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};
