// middleware/authMiddleware.js
import { verifyToken } from '../lib/auth';

export function authMiddleware(handler) {
  return async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = decoded;
    return handler(req, res);
  };
}