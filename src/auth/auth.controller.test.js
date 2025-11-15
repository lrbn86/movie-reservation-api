import request from 'supertest';
import { it, beforeEach, after, mock } from 'node:test';
import assert from 'node:assert/strict';
import app from '../../app.js';
import authRepository from './auth.repository.js';

beforeEach(() => {
  mock.method(authRepository, 'create', async () => { });
});

it('should return 201', async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({ email: 'admin@gmail.com', password: 'pass123' });

  assert.equal(res.statusCode, 201);
});

it('should return 400 if email is not provided', async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({ password: 'pass123' });

  assert.equal(res.statusCode, 400);
});

it('should return 400 if password is not provided', async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({ email: 'admin@gmail.com' });

  assert.equal(res.statusCode, 400);
});

it('should return 400 if both email and password are not provided', async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({});

  assert.equal(res.statusCode, 400);
});

it('should return 400 if both email and password are not provided', async () => {
  const res = await request(app)
    .post('/api/auth/register')

  assert.equal(res.statusCode, 400);
});

it('should return 400 if invalid email is provided', async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({ email: 'invalid', password: 'pass123' });

  assert.equal(res.statusCode, 400);
});

it('should return 409 if email is already registered', async (t) => {
  t.mock.method(authRepository, 'create', async () => {
    throw new Error('Email already registered');
  });

  await request(app)
    .post('/api/auth/register')
    .send({ email: 'admin@email.com', password: 'pass123' });

  const res = await request(app)
    .post('/api/auth/register')
    .send({ email: 'admin@email.com', password: 'pass123' });

  assert.equal(res.statusCode, 409);
});
