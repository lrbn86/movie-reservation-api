import bcrypt from 'bcryptjs';

async function createUser(authRepository, { email, password }) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { email, password: passwordHash };
  return authRepository.create(user);
}

export default {
  createUser
};
