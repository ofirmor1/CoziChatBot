// pages/api/user.js
import { authMiddleware } from '../../middleware/authMiddleware';
import { findUserById, sanitizeUser, updateUser } from '../../lib/users';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const user = findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(sanitizeUser(user));
  } else if (req.method === 'PUT') {
    const { displayName } = req.body;
    if (!displayName) {
      return res.status(400).json({ message: 'Display name is required' });
    }
    const updatedUser = updateUser(req.user.id, { displayName });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(sanitizeUser(updatedUser));
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authMiddleware(handler);