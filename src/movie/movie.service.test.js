import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import movieRepository from './movie.repository.js';
import movieService from './movie.service.js';

describe('Movie Service Test', () => {
  describe('movieService.createMovie', async (t) => {
    it('should throw an error if both title and description are not provided', async () => {
      await assert.rejects(async () => await movieService.createMovie(), Error('title and description are required'));
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
