import db from '../util/db.js';

export async function create(user) {
  const result = await db.insert('users', { email: user.email, password: user.password });
  return result;
}

export default {
  create
};
