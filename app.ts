export {};
const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const moviesRouter = require('./routes/movies');
const { notFoundHandler, errorHandler } = require('./util/movieErrorHandler');

const app = express();

if (config.env === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(
    morgan('combined', { stream: { write: (msg) => console.log(msg.trim()) } })
  );
}

app.use(express.json());
app.use('/movies', moviesRouter);

app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;
