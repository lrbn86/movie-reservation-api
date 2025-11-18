import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import movieRepository from './movie.repository.js';
import movieService from './movie.service.js';

describe('Movie Service Test', () => {
  describe('movieService.createMovie', async () => {
    it('should throw an error if both title and description are not provided', async () => {
      await assert.rejects(async () => await movieService.createMovie(), Error('Title and description are required'));
    });

    it('should throw an error if both title and description are not provided (only title provided)', async () => {
      await assert.rejects(async () => await movieService.createMovie({ title: 'Title' }), Error('Title and description are required'));
    });

    it('should throw an error if both title and description are not provided (only description provided)', async () => {
      await assert.rejects(async () => await movieService.createMovie({ description: 'Description' }), Error('Title and description are required'));
    });

    it('should call movieRepository.create', async (t) => {
      t.mock.method(movieRepository, 'create', async () => { });
      await movieService.createMovie({ title: 'Title', description: 'Description' });
      assert.equal(movieRepository.create.mock.callCount(), 1);
    });

    it('should return a movie object', async (t) => {
      t.mock.method(movieRepository, 'create', async (user) => user);
      const movie = await movieService.createMovie({ title: 'Title', description: 'Description' });
      assert.deepEqual(movie, { title: 'Title', description: 'Description' });
    });
  });

  describe('movieService.getMovies', async () => {
    it('should call movieRepository.getAll', async (t) => {
      t.mock.method(movieRepository, 'getAll', async () => []);
      await movieService.getMovies();
      assert.equal(movieRepository.getAll.mock.callCount(), 1);
    });

    it('should return an array of movies', async (t) => {
      const data = [
        { title: 'Movie #1', description: 'Description #1' },
        { title: 'Movie #2', description: 'Description #2' },
        { title: 'Movie #3', description: 'Description #3' },
      ];
      t.mock.method(movieRepository, 'getAll', async () => data);

      const movies = await movieService.getMovies();
      assert.deepEqual(movies, data);
    });

    it('should return an empty array if there are no movies', async (t) => {
      t.mock.method(movieRepository, 'getAll', async () => []);
      const movies = await movieService.getMovies();
      assert.deepEqual(movies, []);
    });

    it('should throw an error if movieRepository.getAll fails', async (t) => {
      t.mock.method(movieRepository, 'getAll', async () => { throw new Error('Could not get data') });
      await assert.rejects(async () => await movieService.getMovies(), Error('Could not get data'));
    });
  });

  describe('movieService.getMovie', async () => {
    it('should call movieRepository.getById', async (t) => {
      t.mock.method(movieRepository, 'getById', async () => { });

      await movieService.getMovie('fixed-id');

      assert.equal(movieRepository.getById.mock.callCount(), 1);
    });

    it('should return a movie object', async (t) => {
      t.mock.method(movieRepository, 'getById', async () => ({}));

      const movie = await movieService.getMovie('fixed-id');

      assert.deepEqual(movie, {});
    });
  });

  describe('movieService.updateMovie', async () => {
    it('should call movieRepository.update', async (t) => {
      t.mock.method(movieRepository, 'update', async () => { });

      await movieService.updateMovie('fixed-id', {});

      assert.equal(movieRepository.update.mock.callCount(), 1);
    });

    it('should return a movie object', async (t) => {
      t.mock.method(movieRepository, 'update', async () => ({}));

      const movie = await movieService.updateMovie('fixed-id', {});

      assert.deepEqual(movie, {});
    });
  });

  describe('movieService.deleteMovie', async () => {
    it('should call movieRepository.remove', async (t) => {
      t.mock.method(movieRepository, 'remove', async () => { });

      await movieService.deleteMovie('fixed-id');

      assert.equal(movieRepository.remove.mock.callCount(), 1);
    });
  });
});
