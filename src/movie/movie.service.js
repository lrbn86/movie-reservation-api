import movieRepository from './movie.repository.js';

async function createMovie(movieData) {
  if (!movieData?.title || !movieData?.description) {
    throw new Error('Title and description are required');
  }

  const movie = await movieRepository.create(movieData);

  return movie;
}

async function getMovies() {
  const movies = await movieRepository.getAll();
  return movies;
}

async function getMovie(id) {
  const movie = await movieRepository.getById(id);
  return movie;
}

async function updateMovie(id, data) {
  const movie = await movieRepository.update(id, data);
  return movie;
}

async function deleteMovie(id) {
  await movieRepository.remove(id);
}

export default {
  createMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
};
