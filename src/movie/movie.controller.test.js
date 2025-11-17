import request from 'supertest';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import movieService from './movie.service.js';
import app from '../../app.js';

describe('Movie Controller Test', () => {
  describe('movieController.addMovie', () => {
    it('should return 400 if both title and description are not provided', async () => {
      const res = await request(app)
        .post('/api/movies');
      assert.equal(res.statusCode, 400);
    });

    it('should return 400 if both title and description are not provided (only title provided)', async () => {
      const res = await request(app)
        .post('/api/movies')
        .send({ title: 'Title' });
      assert.equal(res.statusCode, 400);
    });

    it('should return 400 if both title and description are not provided (only description provided)', async () => {
      const res = await request(app)
        .post('/api/movies')
        .send({ description: 'Description' });
      assert.equal(res.statusCode, 400);
    });

    it('should call movieService.createMovie', async (t) => {
      t.mock.method(movieService, 'createMovie', async (data) => ({ id: 'id', ...data }));
      await request(app)
        .post('/api/movies')
        .send({ title: 'Title', description: 'Description' });
      assert.equal(movieService.createMovie.mock.callCount(), 1);
    });

    it('should set the location header properly', async (t) => {
      t.mock.method(movieService, 'createMovie', async (data) => ({ id: 'id', ...data }));
      const res = await request(app)
        .post('/api/movies')
        .send({ title: 'Title', description: 'Description' });
      assert.equal(res.headers.location, '/api/movies/id');
    });

    it('should return 201 and movie on success', async (t) => {
      t.mock.method(movieService, 'createMovie', async (data) => ({ id: 'id', createdAt: '', updatedAt: '', ...data }));
      const res = await request(app)
        .post('/api/movies')
        .send({ title: 'Title', description: 'Description' });
      const movie = res.body;
      assert.equal(res.statusCode, 201);
      assert.deepEqual(movie, { id: 'id', title: 'Title', description: 'Description', createdAt: '', updatedAt: '' });
    });
  });

  describe('movieController.getMovies', () => {
    it('should call movieService.getMovies', async (t) => {
      t.mock.method(movieService, 'getMovies', async () => []);
      await request(app)
        .get('/api/movies');
      assert.equal(movieService.getMovies.mock.callCount(), 1);
    });

    it('should return 200 on success', async (t) => {
      t.mock.method(movieService, 'getMovies', async () => []);
      const res = await request(app)
        .get('/api/movies');
      assert.equal(res.statusCode, 200);
    });
  });

  describe('movieController.getMovie', () => {
    it('should call movieService.getMovie', async (t) => {
      t.mock.method(movieService, 'getMovie', async () => { });
      await request(app)
        .get('/api/movies/fixed-id');
      assert.equal(movieService.getMovie.mock.callCount(), 1);
    });

    it('should return 404 if movie does not exist', async (t) => {
      t.mock.method(movieService, 'getMovie', async () => null);
      const res = await request(app)
        .get('/api/movies/fixed-id');
      assert.equal(res.statusCode, 404);
    });
  });

  describe('movieController.updateMovie', () => {
    it('should return 404 if movie to be updated does not exist', async (t) => {
      t.mock.method(movieService, 'updateMovie', async () => null);

      const res = await request(app)
        .put('/api/movies/fixed-id')
        .send({ title: 'Changed', description: 'Changed' });

      assert(res.statusCode, 404);
    });

    it('should call movieService.updateMovie', async (t) => {
      t.mock.method(movieService, 'updateMovie', async () => { });

      await request(app)
        .put('/api/movies/fixed-id')
        .send({ title: 'Changed', description: 'Changed' });

      assert.equal(movieService.updateMovie.mock.callCount(), 1);
    });

    it('should return 200 and updated movie on success', async (t) => {
      t.mock.method(movieService, 'getMovie', async (id) => ({ id, title: 'Changed', description: 'Changed' }));

      const res = await request(app)
        .get('/api/movies/fixed-id')
        .send({ title: 'Changed', description: 'Changed' });

      const movie = res.body;

      assert.equal(res.statusCode, 200);
      assert.deepEqual(movie, { id: 'fixed-id', title: 'Changed', description: 'Changed' });
    });
  });

  describe('movieController.deleteMovie', (t) => {
    it('should return 404 if movie to be deleted does not exist', async (t) => {
      t.mock.method(movieService, 'getMovie', async () => null);
      t.mock.method(movieService, 'deleteMovie', async () => { });

      const res = await request(app)
        .delete('/api/movies/fixed-id');

      assert.equal(res.statusCode, 404);
    });

    it('should call movieService.getMovie', async (t) => {
      t.mock.method(movieService, 'getMovie', async () => { });

      await request(app)
        .delete('/api/movies/fixed-id');

      assert.equal(movieService.getMovie.mock.callCount(), 1);
    });

    it('should call movieService.deleteMovie', async (t) => {
      t.mock.method(movieService, 'getMovie', async (user) => user);
      t.mock.method(movieService, 'deleteMovie', async () => { });

      await request(app)
        .delete('/api/movies/fixed-id');

      assert.equal(movieService.deleteMovie.mock.callCount(), 1);
    });

    it('should return 204 on successful deletion', async (t) => {
      t.mock.method(movieService, 'getMovie', async (user) => user);
      t.mock.method(movieService, 'deleteMovie', async () => { });

      const res = await request(app)
        .delete('/api/movies/fixed-id');

      assert.equal(res.statusCode, 204);
    });
  });
});
