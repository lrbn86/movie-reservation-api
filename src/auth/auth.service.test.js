import validator from 'validator';
import bcrypt from 'bcryptjs';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import authRepository from './auth.repository.js';
import authService from './auth.service.js';

describe('Auth Service Test', () => {
  describe('authService.createUser', () => {
    it('should return user object for valid user and password', async (t) => {
      t.mock.method(validator, 'isEmail', () => true);
      t.mock.method(bcrypt, 'hash', async () => 'fake-hash');
      t.mock.method(authRepository, 'create', async () => ({ id: 'id', email: 'admin@email.com' }));

      const user = await authService.createUser({ email: 'admin@email.com', password: 'pass123' });

      assert.deepEqual(user, { id: 'id', email: 'admin@email.com' });
      assert.equal(validator.isEmail.mock.callCount(), 1);
      assert.equal(bcrypt.hash.mock.callCount(), 1);
      assert.equal(authRepository.create.mock.callCount(), 1);
    });

    it('should throw an error if email is not formatted correctly', async (t) => {
      t.mock.method(validator, 'isEmail', () => false);
      await assert.rejects(async () => await authService.createUser({ email: 'invalid', password: 'pass123' }), Error('Invalid email format'));
    });
  });

  describe('authService.getToken', () => {
    it('should return token for valid user and password', async (t) => {
      const mockUser = { id: 'id', email: 'admin@email.com', password: 'hashed-password' };
      const mockTokenGenerator = () => 'mock-token';
      t.mock.method(authRepository, 'findByEmail', async () => mockUser);
      t.mock.method(bcrypt, 'compare', async () => true);
      t.mock.method(validator, 'isEmail', () => true);
      const result = await authService.getToken(mockUser, mockTokenGenerator);

      assert.equal(result, 'mock-token');
      assert.equal(authRepository.findByEmail.mock.callCount(), 1);
      assert.equal(bcrypt.compare.mock.callCount(), 1);
      assert.equal(validator.isEmail.mock.callCount(), 1);
    });

    it('should throw an error if email is invalid', async (t) => {
      const mockUser = { id: 'id', email: 'invalid', password: 'hashed-password' };
      const mockTokenGenerator = () => 'mock-token';
      t.mock.method(authRepository, 'findByEmail', async () => mockUser);
      t.mock.method(validator, 'isEmail', () => false);

      await assert.rejects(
        async () => await authService.getToken(mockUser, mockTokenGenerator),
        Error('Invalid credentials')
      );
    });

    it('should throw an error if user not found', async (t) => {
      const mockUser = { id: 'id', email: 'admin@email.com', password: 'hashed-password' };
      const mockTokenGenerator = () => 'mock-token';
      t.mock.method(authRepository, 'findByEmail', async () => null);

      await assert.rejects(
        async () => await authService.getToken(mockUser, mockTokenGenerator),
        Error('Invalid credentials')
      );
    });

    it('should throw an error if password does not match', async (t) => {
      const mockUser = { id: 'id', email: 'admin@email.com', password: 'hashed-password' };
      const mockTokenGenerator = () => 'mock-token';
      t.mock.method(authRepository, 'findByEmail', async () => null);
      t.mock.method(bcrypt, 'compare', async () => false);

      await assert.rejects(
        async () => await authService.getToken(mockUser, mockTokenGenerator),
        Error('Invalid credentials')
      );
    });
  });
});
