import db from '../util/db.js';

// TODO: Search up pg docs to do this properly
export async function create(user) {
  const result = await db.query('insert into users (email, password) values ($1, $2) returning *', [user.email, user.password]);
  return result.rows[0];
}

export default {
  create
};
