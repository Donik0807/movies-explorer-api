const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getMovies, saveMovie, deleteMovie } = require('../controllers/movies');
const { saveMovieValidator, deleteMovieValidator } = require('../utils/validators');

router.get('/movies', getMovies);

router.post('/movies', celebrate(saveMovieValidator), saveMovie);

router.delete('/movies/:movieId', celebrate(deleteMovieValidator), deleteMovie);

module.exports = {
  movieRouter: router,
};
