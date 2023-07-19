const mongoose = require('mongoose');
const urlExpression = require('../utils/urlExpression');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlExpression.test(v);
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlExpression.test(v);
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlExpression.test(v);
      },
    },
  },
  owner: {
    type: mongoose.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;
