// pages/api/updateProfile.js
import { authMiddleware } from '../../middleware/authMiddleware';
import { findUserById, updateUser, sanitizeUser } from '../../lib/users';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { displayName, email } = req.body;

  if (!displayName && !email) {
    return res.status(400).json({ message: 'No update data provided' });
  }

  try {
    const user = findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updates = {};
    if (displayName) updates.displayName = displayName;
    if (email) updates.email = email;

    const updatedUser = updateUser(user.id, updates);
    
    if (!updatedUser) {
      return res.status(500).json({ message: 'Failed to update user' });
    }

    res.status(200).json(sanitizeUser(updatedUser));
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default authMiddleware(handler);