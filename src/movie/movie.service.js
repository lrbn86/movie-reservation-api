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

async function filterMovies() {
}

async function removeMovie() {

}

export default {
  createMovie,
  getMovies,
};
