// services/authService.js
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
const usersData = require('../models/userShema');
// chargement du fichier d'env
require('dotenv').config();
// accès au variables
key_ACCESS = process.env.ACCESS_TOKEN_SECRET;

generateAccessToken = function generateAccessToken(user) {
    console.log(key_ACCESS)
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
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
  
// const authenticateUser = async (username, password) => {
//     const user = await userModel.findOne({ username });
    
//     if (!user || !bcrypt.compareSync(password, user.password)) {
//       return null; // Les informations d'identification ne sont pas valides
//     }
  
//     return user;
//   };
  

// const verifyToken = (token) => {
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     return decoded;
//   } catch (err) {
//     return null;
//   }
// };

module.exports = { generateAccessToken,authenticateToken };
