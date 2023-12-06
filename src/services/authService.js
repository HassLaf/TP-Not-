// services/authService.js
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
const usersData = require('../models/userShema');
// chargement du fichier d'env
require('dotenv').config();
// accès au variables
key_ACCESS = process.env.ACCESS_TOKEN_SECRET;

generateAccessToken = function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  }

generateRefreshToken = function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });
}

// Fonction pour vérifier refreshToken
verifyRefreshToken = function verifyRefreshToken(refreshToken) {
  try {
      const status = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);
      return status;
  } catch (error) {
      throw error; // Vous pouvez gérer les erreurs spécifiques ici
  }
}

authenticateToken =  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(401)
      }
      req.user = user;
      next();
    });
  }
  
module.exports = { generateAccessToken,authenticateToken,generateRefreshToken,verifyRefreshToken };
