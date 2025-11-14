import db from '../util/db.js';

async function create(user) {
  const result = await db.insert('users', { email: user.email, password: user.password, role: 'user' });
  return result;
}

async function findByEmail(user) {
  const result = await db.findByEmail('users', { email: user.email });
  return result;
}

export default {
  create,
  findByEmail
};
