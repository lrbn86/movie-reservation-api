import validator from 'validator';
import bcrypt from 'bcryptjs';
import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import authRepository from './auth.repository.js';
import authService from './auth.service.js';

describe('Auth Service Test', () => {
  describe('authService.createUser', () => {
    beforeEach(() => {
      mock.method(authRepository, 'create', async () => { });
    })

    it('should throw an error if both email and password are not provided', async () => {
      await assert.rejects(async () => await authService.createUser(), Error('Both email and password are required'));
      await assert.rejects(async () => await authService.createUser({ email: 'admin@email.com' }), Error('Both email and password are required'));
      await assert.rejects(async () => await authService.createUser({ password: 'pass123' }), Error('Both email and password are required'));
      await assert.rejects(async () => await authService.createUser({ email: '', password: '' }), Error('Both email and password are required'));
    });

    it('should throw an error if email is invalid', async (t) => {
      t.mock.method(validator, 'isEmail', () => false);

      await assert.rejects(async () => await authService.createUser({ email: 'invalid', password: 'pass123' }), Error('Invalid email'));
    });

    it('should call bcrypt.hash', async (t) => {
      t.mock.method(bcrypt, 'hash', async () => { });

      await authService.createUser({ email: 'admin@email.com', password: 'pass123' });

      assert.equal(bcrypt.hash.mock.callCount(), 1);
    });

    it('should call authRepository.create', async (t) => {
      t.mock.method(authRepository, 'create', async () => { });

      await authService.createUser({ email: 'admin@email.com', password: 'pass123' });

      assert.equal(authRepository.create.mock.callCount(), 1);
    });

    it('should return a user', async (t) => {
      t.mock.method(validator, 'isEmail', () => true);
      t.mock.method(authRepository, 'create', async (user) => {
        return {
          id: '',
          email: user.email,
          role: 'user',
          createdAt: '',
          updatedAt: '',
        };
      });

      const user = await authService.createUser({ email: 'admin@email.com', password: 'pass123' });

      assert.deepEqual(user, {
        id: '',
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    });
  });
});
