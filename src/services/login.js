// login.js
const userBase = require('../models/userShema');
const authService = require('./authService');
const bcrypt = require('bcrypt');



async function login(uEmail, password) {
    try {
        console.log("Recherche du Nom dans la base de données ...");

        const userData = await userBase.findOne({ email : uEmail });
        //console.log(userData);
        if (!userData) {
            // L'utilisateur n'a pas été trouvé
            console.log('Utilisateur non trouvé');
            return { error: 'Utilisateur non trouvé' };
        }

        const result = await bcrypt.compare(password, userData.Hashedpassword);

        if(result){
            const userData = await userBase.findOne({ email : uEmail },'name email');
            const accessToken = authService.generateAccessToken(userData.toObject());
            const refreshAcessToken = authService.generateRefreshToken(userData.toObject());
            return { accessToken,refreshAcessToken };
        } else {
            return { error: 'Coordonnées incorrectes' };
        }
    } catch (error) {
        console.error('Error during login:', error);
        return { error: 'Internal Server Error' };
    }
}

refresh = async function refresh(refreshToken){
    try {
        // Décodage de la token
        const decoded = authService.verifyRefreshToken(refreshToken);

        // Rechercher l'utilisateur dans la base de données
        const userData = await userBase.findOne({ email: decoded.email }, 'name email');

        if (!userData) {
            // L'utilisateur n'a pas été trouvé
            console.log('Utilisateur non trouvé');
            return { error: 'Utilisateur non trouvé' };
        }

        // Générer un nouvel accessToken
        const accessToken = authService.generateAccessToken(userData.toObject());

        return { accessToken };
    } catch (error) {
        console.error('Error during token refresh:', error);
        return { error: 'Internal Server Error' };
    }

}

module.exports = {
    login,
    refresh
};
