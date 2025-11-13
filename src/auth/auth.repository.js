import db from '../util/db.js';
import crypto from 'node:crypto';

export async function create(user) {
  return { id: crypto.randomUUID(), ...user };
}

export default {
  create
};
