require('dotenv').config();

const setupExpressApp = require('./loaders/express')
const routes = require('./loaders/routes');
const app = setupExpressApp();
const port = process.env.PORT ||3000;
const http = require('http');
const tokenG = require("./services/authService")
// getting-started.js
const mongoose = require('mongoose');

console.log("URL de la base de données :", process.env.DATABASE_URL);

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("Connexion à la base de données est OK !");
});

var server = http.createServer(app) 
console.log("Connexion au serveur est Ok !")

server.listen(port, () => {
  console.log(`Your app listening on port ${port}`)
})
