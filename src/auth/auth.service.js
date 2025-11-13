import validator from 'validator';
import bcrypt from 'bcryptjs';
import authRepository from './auth.repository.js';

async function createUser(user) {
  const email = user?.email;
  const password = user?.password;

  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  if (!validator.isEmail(email)) {
    throw new Error('Invalid email');
  }

  const passwordHash = await bcrypt.hash(user.password, 10);

  return authRepository.create({ email: user.email, password: passwordHash });
}

export default {
  createUser
};
