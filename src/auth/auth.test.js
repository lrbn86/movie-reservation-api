import bcrypt from 'bcryptjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import authService from './auth.service.js';

const id = crypto.randomUUID();

const authRepositoryMock = {
  create: async (user) => ({ id, ...user })
}

test('createUser hashes password and saves user', async () => {
  const userData = { email: 'admin@email.com', password: 'admin' };

  const user = await authService.createUser(authRepositoryMock, userData);

  assert.ok(user.hasOwnProperty('id'));
  assert.equal(user.id, id);

  assert.ok(user.hasOwnProperty('email'));
  assert.equal(user.email, 'admin@email.com');

  assert.ok(user.hasOwnProperty('password'));
  assert.notEqual(user.password, userData.password);
  assert.ok(await bcrypt.compare(userData.password, user.password));
});
