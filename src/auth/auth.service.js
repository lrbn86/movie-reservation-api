import jwt from 'jsonwebtoken';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import authRepository from './auth.repository.js';

async function createUser(userData) {
  const email = userData?.email;
  const password = userData?.password;

  if (!email || !password) {
    throw new Error('Both email and password are required');
  }

  if (!validator.isEmail(email)) {
    throw new Error('Invalid email');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await authRepository.create({ email, password: passwordHash });

  return user;
}

async function getToken(user) {
  const email = user?.email;
  const password = user?.password;

  if (!email || !password) {
    throw new Error('Both email and password are required');
  }

  const userFound = await authRepository.findByEmail(user);

  if (!userFound) {
    throw new Error('User not found');
  }

  const passwordMatch = await bcrypt.compare(password, userFound.password);

  if (!passwordMatch) {
    throw new Error('Wrong password');
  }

  return generateAccessToken(userFound);
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
