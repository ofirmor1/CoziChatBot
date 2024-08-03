// pages/api/login.js
import { findUserByEmail } from '../../lib/users';
import { comparePasswords, generateToken } from '../../lib/auth';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    console.log('Login attempt:', email); // Debug log

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' });
    }

    const user = findUserByEmail(email);

    console.log('User found:', user ? 'Yes' : 'No'); // Debug log

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    try {
      const isPasswordValid = await comparePasswords(password, user.password);

      console.log('Password valid:', isPasswordValid); // Debug log

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = generateToken(user);
      res.status(200).json({ message: 'Login successful', token, user: { email: user.email, displayName: user.displayName } });
    } catch (error) {
      console.error('Error during password comparison:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}