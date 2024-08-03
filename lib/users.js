// lib/users.js
import { v4 as uuidv4 } from 'uuid';

let users = [];

export function addUser(user) {
  const newUser = {
    id: uuidv4(),
    ...user,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  users.push(newUser);
  console.log('User added:', newUser.email); // Debug log
  console.log('Total users:', users.length); // Debug log
  return sanitizeUser(newUser);
}

export function findUserByEmail(email) {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id) {
  return users.find(user => user.id === id);
}

export function updateUser(id, updates) {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { 
      ...users[userIndex], 
      ...updates, 
      updatedAt: new Date().toISOString() 
    };
    return sanitizeUser(users[userIndex]);
  }
  return null;
}

export function deleteUser(id) {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1)[0];
    return sanitizeUser(deletedUser);
  }
  return null;
}

// Utility function to get user without sensitive information
export function sanitizeUser(user) {
  if (!user) return null;
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
}

// New function to get all users (for admin purposes, if needed)
export function getAllUsers() {
  return users.map(sanitizeUser);
}