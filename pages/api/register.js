// pages/api/register.js
import { addUser, findUserByEmail } from '../../lib/users';
import { hashPassword, generateToken } from '../../lib/auth';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, displayName } = req.body;

    console.log('Registration attempt:', email); // Debug log

    if (!email || !password || !displayName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (findUserByEmail(email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    try {
      const hashedPassword = await hashPassword(password);
      const newUser = { email, password: hashedPassword, displayName };
      addUser(newUser);

      const token = generateToken(newUser);
      res.status(201).json({ message: 'User registered successfully', token, user: { email, displayName } });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}