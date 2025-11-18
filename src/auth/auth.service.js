import jwt from 'jsonwebtoken';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import authRepository from './auth.repository.js';

async function createUser(userData) {
  const email = typeof userData?.email === 'string' ? userData.email.trim().toLowerCase() : '';
  const password = typeof userData?.password === 'string' ? userData.password : '';

  if (!validator.isEmail(email)) {
    throw new Error('Invalid email format');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await authRepository.create({ email, password: passwordHash });

  return user;
}

async function getToken(user, tokenGenerator = generateAccessToken) {
  const email = typeof user?.email === 'string' ? user.email.trim().toLowerCase() : '';
  const password = typeof user?.password === 'string' ? user.password : '';

  const fakeHash = '$2b$10$e0UDJZA3sTikAXoqWnvjJu.aA2ZNV8lC7skFO5CBt2csDZP5To1oq';
  const userFound = await authRepository.findByEmail(email);
  const passwordMatch = await bcrypt.compare(password, userFound?.password ?? fakeHash);

  if (!validator.isEmail(email) || !userFound || !passwordMatch) {
    throw new Error('Email and password are invalid');
  }

  const token = tokenGenerator(userFound);

  return token;
}

async function generateAccessToken(payload) {
  const { password, ...user } = payload;
  const token = jwt.sign(user, process.env.JWT_SECRET || 'secretkey', { expiresIn: '5m' });
  return token;
}

export default {
  createUser,
  getToken,
};
