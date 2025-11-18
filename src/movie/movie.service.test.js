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


  describe('movieService.getMovies', async (t) => {

  });

  describe('movieService.getMovie', async (t) => {

  });

  describe('movieService.updateMovie', async (t) => {

  });

  describe('movieService.deleteMovie', async (t) => {

  });
});
