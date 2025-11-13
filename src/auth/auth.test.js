import bcrypt from 'bcryptjs';
import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import authRepository from './auth.repository.js';
import authService from './auth.service.js';

describe('Auth Service Test', () => {
  beforeEach(() => {
    mock.method(bcrypt, 'hash', async () => 'fake-hash');
    mock.method(authRepository, 'create', async (user) => ({ id: 'fixed-id-123', ...user }));
  });

  it('should register a user successfully', async () => {
    const user = { email: 'admin@email.com', password: 'pass123' };
    const result = await authService.createUser(user);
    assert.equal(result.id, 'fixed-id-123');
    assert.equal(result.email, user.email);
    assert.equal(result.password, 'fake-hash');
    assert.equal(bcrypt.hash.mock.calls[0].arguments[0], user.password);
    assert.equal(bcrypt.hash.mock.calls[0].arguments[1], 10);
    assert.equal(authRepository.create.mock.calls[0].arguments[0].email, user.email);
    assert.equal(authRepository.create.mock.calls[0].arguments[0].password, 'fake-hash');
  });
});
