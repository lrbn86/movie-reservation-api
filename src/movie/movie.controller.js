import movieService from './movie.service.js';

async function addMovie(req, res) {
  const title = req.body?.title;
  const description = req.body?.description;
  const posterImageUrl = req.body?.posterImage;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const movie = await movieService.createMovie({ title, description, posterImageUrl });

  res.location(`/api/movies/${movie.id}`);

  return res.status(201).json(movie);
}

async function getMovies(req, res) {
  const movies = await movieService.getMovies();
  return res.status(200).json(movies);
}

async function getMovie(req, res) {
  const movieId = req.params?.movieId;
  if (!movieId) {
    return res.status(400).json({ error: 'Id required' });
  }
  const movie = await movieService.getMovie(movieId);

  if (!movie) {
    return res.status(404).json({ error: 'Movie does not exist' });
  }

  return res.status(200).json(movie);
}

async function updateMovie(req, res) {
  const movieId = req.params?.movieId;
  if (!movieId) {
    return res.status(400).json({ error: 'Id required' });
  }
  return res.status(200).json({ message: `Update movie ${movieId}` });
}

async function deleteMovie(req, res) {
  const movieId = req.params?.movieId;
  if (!movieId) {
    return res.status(400).json({ error: 'Id required' });
  }
  return res.status(200).json({ message: `Delete movie ${movieId}` });
}

export default {
  addMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
};
