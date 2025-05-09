const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secret@@@112233';

// Get all users (similar a /employees)
const getUsers = async () => {
  const result = await db.query('SELECT * FROM usuarios');
  return result.rows;
};

// Get user by ID (similar a /employees/{id})
const getUser = async (userId) => {
  const result = await db.query('SELECT * FROM usuarios WHERE id = $1', [userId]);
  return result.rows[0];
};

// Add user (similar a POST /employees)
const addUser = async ({ username, email, password, dni }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query(
    'INSERT INTO usuarios (username, email, password, dni) VALUES ($1, $2, $3, $4) RETURNING *',
    [username, email, hashedPassword, dni]
  );
  return result.rows[0];
};

// Update user (similar a PUT /employees/{id})
const updateUser = async (userId, { username, email }) => {
  const result = await db.query(
    'UPDATE usuarios SET username = $1, email = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
    [username, email, userId]
  );
  return result.rows[0];
};

// Delete user (similar a DELETE /employees/{id})
const deleteUser = async (userId) => {
  await db.query('DELETE FROM usuarios WHERE id = $1', [userId]);
};

module.exports = { getUsers, getUser, addUser, updateUser, deleteUser };
