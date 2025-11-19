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

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await authRepository.create({ email, password: passwordHash });

  return user;
}

async function getToken(user, tokenGenerator = generateAccessToken) {
  const email = typeof user?.email === 'string' ? user.email.trim().toLowerCase() : '';
  const password = typeof user?.password === 'string' ? user.password : '';

  const validEmail = validator.isEmail(email);
  const userFound = await authRepository.findByEmail(email);
  const hash = userFound?.password ?? '$2b$12$Um8OMWcg95p9LojtLRZI4u3QdYc0Lk/W7pB0qWFnu8u/iYzd0w7zK';
  const validPassword = await bcrypt.compare(password, hash);
  const authenticated = validEmail && userFound && validPassword;

  if (!authenticated) {
    throw new Error('Invalid credentials');
  }

  const token = tokenGenerator(userFound);

  return token;
}

async function generateAccessToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT secret key required for signing');
  }

  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };

  try {
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5m', algorithm: 'HS256' }
    );
    return token;
  } catch (err) {
    throw new Error('Failed to generate access token');
  }
}

export default {
  createUser,
  getToken,
};
