import validator from 'validator';
import bcrypt from 'bcryptjs';
import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import authRepository from './auth.repository.js';
import authService from './auth.service.js';

describe('Auth Service Test', () => {
  beforeEach(() => {
    mock.method(authRepository, 'create', async (user) => {
      return {
        id: 'id',
        email: user.email,
        role: 'user',
        createdAt: '',
        updatedAt: '',
      };
    });
  });

  it('should call the bcrypt.hash', async (t) => {
    t.mock.method(bcrypt, 'hash', async () => 'hash');
    await authService.createUser({ email: 'admin@email.com', password: 'pass123' });

    assert.equal(bcrypt.hash.mock.callCount(), 1);
  });

  it('should call the validator.isEmail', async (t) => {
    t.mock.method(validator, 'isEmail', async () => { });

    await authService.createUser({ email: 'admin@email.com', password: 'pass123' });

    assert.equal(validator.isEmail.mock.callCount(), 1);
  });

  it('should call the authRepository.create', async () => {
    await authService.createUser({ email: 'admin@email.com', password: 'pass123' });

    assert.equal(authRepository.create.mock.callCount(), 1);
  });

  it('should return a user', async () => {
    const user = await authService.createUser({ email: 'admin@email.com', password: 'pass123' });

    assert.deepEqual(user, {
      id: 'id',
      email: 'admin@email.com',
      role: 'user',
      createdAt: '',
      updatedAt: '',
    });
  });

  it('should throw an error if email is not provided', async () => {
    await assert.rejects(async () => await authService.createUser({ password: 'pass123' }), Error('Email and password are required'));
  });

  it('should throw an error if password is not provided', async () => {
    await assert.rejects(async () => await authService.createUser({ email: 'admin@email.com' }), Error('Email and password are required'));
  });

  it('should throw an error if both email and password are not provided', async () => {
    await assert.rejects(async () => await authService.createUser(), Error('Email and password are required'));
    await assert.rejects(async () => await authService.createUser({}), Error('Email and password are required'));
    await assert.rejects(async () => await authService.createUser({ email: '', password: '' }), Error('Email and password are required'));
  });

  it('should throw an error if invalid email is provided', async () => {
    await assert.rejects(async () => await authService.createUser({ email: 'invalid', password: 'pass123' }), Error('Invalid email'));
  });
});
