import movieRepository from './movie.repository.js';

async function createMovie(movieData) {
  const movie = await movieRepository.create(movieData);
  return movie;
}

async function filterMovies() {
}

async function removeMovie() {

}

export default {
  createMovie,
};
