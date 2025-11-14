import request from 'supertest';
import { describe, it, mock, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../../app.js';

describe('Movie Controller', () => {
  it('should return status code 201 on successful movie creation', async () => {
    const res = await request(app)
      .post('/api/movies')
      .send({ title: 'Movie', description: 'Description' });
    assert.equal(res.statusCode, 201);
    assert.equal(res.body.title, 'Movie');
    assert.equal(res.body.description, 'Description');
  });

  it('should have a location header in response', async () => {
    const res = await request(app)
      .post('/api/movies')
      .send({ title: 'Movie', description: 'Description' });
    assert.ok(res.headers['location']);
    assert.ok(res.headers['location'].startsWith('/api/movies'));
  });

  it('should return created movie with correct fields', async () => {
    const res = await request(app)
      .post('/api/movies')
      .send({ title: 'Movie', description: 'Description' });
    assert.ok(res.body.id);
    assert.ok(res.body.title);
    assert.ok(res.body.description);
    assert.ok(res.body.createdAt);
    assert.ok(res.body.updatedAt);
  });

  it('should have correct title and description', async () => {
    const res = await request(app)
      .post('/api/movies')
      .send({ title: 'Movie', description: 'Description' });
    assert.equal(res.body.title, 'Movie');
    assert.equal(res.body.description, 'Description');
  });

  it('should return status code 400 if both title and description are not provided', async () => {
    const res = await request(app)
      .post('/api/movies')
      .send();
    assert.equal(res.statusCode, 400);
    assert.equal(res.body.error, 'Title and description are required');
  });

  it('should return status code 400 if both title and description are not provided', async () => {
    const res = await request(app)
      .post('/api/movies')
      .send({});
    assert.equal(res.statusCode, 400);
    assert.equal(res.body.error, 'Title and description are required');
  });

  it('should return status code 400 if both title and description are not provided', async () => {
    const res = await request(app)
      .post('/api/movies')
      .send({ title: '', description: '' });
    assert.equal(res.statusCode, 400);
    assert.equal(res.body.error, 'Title and description are required');
  });

  it('should return status code 400 if both title and description are not provided', async () => {
    const res = await request(app)
      .post('/api/movies')
      .send({ title: '' });
    assert.equal(res.statusCode, 400);
    assert.equal(res.body.error, 'Title and description are required');
  });

  it('should return status code 400 if both title and description are not provided', async () => {
    const res = await request(app)
      .post('/api/movies')
      .send({ description: '' });
    assert.equal(res.statusCode, 400);
    assert.equal(res.body.error, 'Title and description are required');
  });
});

describe('Movie Service', () => {
  it('should create a movie successfully', async () => {
    throw 'Implement test';
  });

  it('should get all movies successfully', async () => {
    throw 'Implement test';
  });

  it('should get a movie successfully', async () => {
    throw 'Implement test';
  });

  it('should update a movie successfully', async () => {
    throw 'Implement test';
  });

  it('should delete a movie successfully', async () => {
    throw 'Implement test';
  });
});
