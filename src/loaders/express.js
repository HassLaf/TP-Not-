const express = require('express');
const configureMiddleware = require('./configMiddleWare');

function setupExpressApp() {
  const app = express();

  // Configure middleware
  configureMiddleware(app);


  return app;
}

module.exports = setupExpressApp;
