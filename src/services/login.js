// login.js
const userBase = require('../models/userShema');
const authService = require('./authService');

async function login(userName, password) {
    try {
        console.log("Recherche du Nom dans la base de données ...");

        const userData = await userBase.findOne({ name: userName });

        if (!userData) {
            // L'utilisateur n'a pas été trouvé
            console.log('Utilisateur non trouvé');
            return { error: 'Utilisateur non trouvé' };
        }

        if (userData.password === password) {
            const accessToken = authService.generateAccessToken(userData.toObject());
            return { accessToken };
        } else {
            return { error: 'Coordonnées incorrectes' };
        }
    } catch (error) {
        console.error('Error during login:', error);
        return { error: 'Internal Server Error' };
    }
}

module.exports = {
    login
};
