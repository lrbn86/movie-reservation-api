async function addMovie(req, res) {
  const title = req.body?.title;
  const description = req.body?.description;
  const genre = req.body?.genre || '';
  const posterImage = req.body?.posterImage || '';

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description required' });
  }

  return res.status(201).json({ message: 'Created movie' });
}

async function getMovies(req, res) {
  return res.status(200).json({ message: 'Heres all the movies' });
}

async function getMovie(req, res) {
  const movieId = req.params?.movieId;
  if (!movieId) {
    return res.status(400).json({ error: 'Movie Id needed' });
  }
  return res.status(200).json({ message: `Got movie ${movieId}` });
}

async function updateMovie(req, res) {
  const movieId = req.params?.movieId;
  if (!movieId) {
    return res.status(400).json({ error: 'Movie Id needed' });
  }
  return res.status(200).json({ message: `Update movie ${movieId}` });
}

async function deleteMovie(req, res) {
  const movieId = req.params?.movieId;
  if (!movieId) {
    return res.status(400).json({ error: 'Movie Id needed' });
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
