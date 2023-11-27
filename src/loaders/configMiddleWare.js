const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

function configureMiddleware(app) {
  
  // Middleware for parsing JSON requests
  app.use(bodyParser.json());

  // Middleware for parsing URL-encoded data
  app.use(bodyParser.urlencoded({ extended: false }));
  // Middleware for enabling Cross-Origin Resource Sharing (CORS)
  app.use(cors());

  app.use(routes)
  // Error handling middleware (you can define custom error handling here)
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
}

module.exports = configureMiddleware;
