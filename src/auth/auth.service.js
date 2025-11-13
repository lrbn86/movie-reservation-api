import bcrypt from 'bcryptjs';
import authRepository from './auth.repository.js';

async function createUser(user) {
  const passwordHash = await bcrypt.hash(user.password, 10);
  return authRepository.create({ email: user.email, password: passwordHash });
}

export default {
  createUser
};
