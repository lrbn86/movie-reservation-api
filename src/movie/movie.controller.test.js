import request from 'supertest';
import { describe, it, mock, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import movieRepository from './movie.repository.js';
import movieService from './movie.service.js';
import app from '../../app.js';

describe('Movie Controller', () => {
  beforeEach(() => {
    mock.method(movieRepository, 'create', async (data) => ({ id: 'id', ...data }));
  });

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

  it('should have correct title and description', async () => {
    const res = await request(app)
      .post('/api/movies')
      .send({ title: 'Movie', description: 'Description' });
    assert.equal(res.body.title, 'Movie');
    assert.equal(res.body.description, 'Description');
  });

  it('should call the movieService.createMovie', async (t) => {
    t.mock.method(movieService, 'createMovie', async (data) => ({ id: 'id', ...data }));
    await request(app)
      .post('/api/movies')
      .send({ title: 'Movie', description: 'Description' });
    assert.equal(movieService.createMovie.mock.callCount(), 1);
  });

  it('should call the movieService.getMovies', async (t) => {
    t.mock.method(movieService, 'getMovies', async () => { });
    await request(app)
      .get('/api/movies');
    assert.equal(movieService.getMovies.mock.callCount(), 1);
  });

  it('should call the movieService.getMovie', async (t) => {
    t.mock.method(movieService, 'getMovie', async (id) => { });
    await request(app)
      .get('/api/movies/movieId');
    assert.equal(movieService.getMovie.mock.callCount(), 1);
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
