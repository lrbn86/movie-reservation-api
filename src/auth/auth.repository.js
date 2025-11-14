import db from '../util/db.js';

export async function create(user) {
  const result = await db.insert('users', { email: user.email, password: user.password, role: 'user' });
  return result;
}

export async function findByEmail(user) {
  const result = await db.findByEmail('users', { email: user.email });
  return result;
}

export default {
  create,
  findByEmail
};
