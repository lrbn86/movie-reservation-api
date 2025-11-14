import express from 'express';
import movieController from './movie.controller.js';

const router = express.Router();

router.post('/', movieController.addMovie);
router.get('/', movieController.getMovies);
router.get('/:movieId', movieController.getMovie);
router.put('/:movieId', movieController.updateMovie);
router.delete('/:movieId', movieController.deleteMovie);

export default router;
