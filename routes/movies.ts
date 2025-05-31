import express from 'express';
import {
  pageValidator,
  yearValidator,
  orderValidator,
  genreValidator,
  movieIdValidator,
} from '../util/movieApiValidations';
const router = express.Router();
const moviesController = require('../controller/moviesController');

router.get('/', pageValidator, moviesController.listMovies);

router.get(
  '/year/:year',
  yearValidator,
  orderValidator,
  pageValidator,
  moviesController.moviesByYear
);

router.get(
  '/genre/:genre',
  genreValidator,
  pageValidator,
  moviesController.moviesByGenre
);

router.get('/:id', movieIdValidator, moviesController.movieDetails);

module.exports = router;
