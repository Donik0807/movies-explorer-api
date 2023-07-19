const Movie = require('../models/movieSchema');
const NotFoundError = require('../utils/errorClasses/NotFoundError');
const InvalidDataError = require('../utils/errorClasses/InvalidDataError');
const ForbiddenError = require('../utils/errorClasses/ForbiddenError');

const getMovies = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

const saveMovie = (req, res, next) => {
  const { _id } = req.user;

  Movie.create({ ...req.body, owner: _id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      let customError = err;

      if (err.name === 'ValidationError') {
        customError = new InvalidDataError(
          'Переданы некорректные данные при сохранении фильма',
        );
      }

      next(customError);
    });
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.user;
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail()
    .then((movie) => {
      if (movie.owner.toString() === _id) {
        return movie.deleteOne().then(() => {
          res.send({ message: 'Фильм удален' });
        });
      }
      return Promise.reject(new ForbiddenError('Нельзя удалить чужой фильм'));
    })
    .catch((err) => {
      let customError = err;
      if (err.name === 'CastError') {
        customError = new InvalidDataError('Переданы некорректные данные для удаления фильма');
      }

      if (err.name === 'DocumentNotFoundError') {
        customError = new NotFoundError('Фильм с указанным _id не найден');
      }

      next(customError);
    });
};

module.exports = {
  getMovies,
  saveMovie,
  deleteMovie,
};
