import request from 'supertest';
import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import app from '../../app.js';
import authRepository from './auth.repository.js';
import authService from './auth.service.js';

describe('Auth Controller Test', () => {
  describe('authController.register', () => {
    beforeEach(() => {
      mock.method(authService, 'createUser', async () => { });
    });

    it('should return 400 if both email and password are not provided', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send();

      assert.equal(res.statusCode, 400);
      assert.equal(res.body.error, 'Both email and password are required')
    });

    it('should return 400 if both email and password are not provided (only email provided)', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'admin@email.com' });

      assert.equal(res.statusCode, 400);
      assert.equal(res.body.error, 'Both email and password are required')
    });

    it('should return 400 if both email and password are not provided (only password provided)', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ password: 'pass123' });

      assert.equal(res.statusCode, 400);
      assert.equal(res.body.error, 'Both email and password are required')
    });

    it('should call authService.createUser', async (t) => {
      await request(app)
        .post('/api/auth/register')
        .send({ email: 'admin@gmail.com', password: 'pass123' });

      assert.equal(authService.createUser.mock.callCount(), 1);
    });

    it('should return 400 if invalid email is provided', async (t) => {
      t.mock.method(authService, 'createUser', async () => {
        throw new Error('Invalid email')
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'invalid', password: 'pass123' });

      assert.equal(res.statusCode, 400);
      assert.equal(res.body.error, 'Invalid email');
    });

    it('should return 409 if email is already registered', async (t) => {
      t.mock.method(authService, 'createUser', async () => {
        throw new Error('Email already registered');
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'admin@email.com', password: 'pass123' });

      assert.equal(res.statusCode, 409);
      assert.equal(res.body.error, 'Email already registered');
    });

    it('should return 201 on successful registration', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'admin@gmail.com', password: 'pass123' });

      assert.equal(res.statusCode, 201);
    });
  });

  describe('authController.login', async () => {
    beforeEach(() => {
      mock.method(authService, 'getToken', async () => { });
    });

    it('should return 400 if both email and password are not provided', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send();

      assert.equal(res.statusCode, 400);
      assert.equal(res.body.error, 'Both email and password are required')
    });

    it('should return 400 if both email and password are not provided (only email provided)', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@email.com' });

      assert.equal(res.statusCode, 400);
      assert.equal(res.body.error, 'Both email and password are required')
    });

    it('should return 400 if both email and password are not provided (only password provided)', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ password: 'pass123' });

      assert.equal(res.statusCode, 400);
      assert.equal(res.body.error, 'Both email and password are required')
    });

    it('should call authService.getToken', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@email.com', password: 'pass123' });

      assert.equal(authService.getToken.mock.callCount(), 1);
    });

    it('should return 200 if successful login', async (t) => {
      t.mock.method(authService, 'getToken', async () => 'token');

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@email.com', password: 'pass123' });

      assert.equal(res.statusCode, 200);
      assert.equal(res.body.token, 'token');
    });

    it('should return 401 if unsuccessful login', async (t) => {
      t.mock.method(authService, 'getToken', async () => {
        throw new Error();
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@email.com', password: 'pass123' });

      assert.equal(res.statusCode, 401);
    });
  });
});
