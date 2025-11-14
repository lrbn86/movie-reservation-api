import movieService from './movie.service.js';

async function addMovie(req, res) {
  const title = req.body?.title;
  const description = req.body?.description;
  const posterImageUrl = req.body?.posterImage;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description required' });
  }

  const movie = await movieService.createMovie({ title, description, posterImageUrl });

  res.setHeader('Location', `/api/movies/${movie.id}`);

  return res.status(201).json(movie);
}

async function getMovies(req, res) {
  return res.status(200).json({ message: 'Heres all the movies' });
}

async function getMovie(req, res) {
  const movieId = req.params?.movieId;
  if (!movieId) {
    return res.status(400).json({ error: 'Id required' });
  }
  return res.status(200).json({ message: `Got movie ${movieId}` });
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
