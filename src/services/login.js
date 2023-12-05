// login.js
const userBase = require('../models/userShema');
const authService = require('./authService');
const bcrypt = require('bcrypt');



async function login(uEmail, password) {
    try {
        console.log("Recherche du Nom dans la base de données ...");

        const userData = await userBase.findOne({ email : uEmail });
        console.log(userData);
        if (!userData) {
            // L'utilisateur n'a pas été trouvé
            console.log('Utilisateur non trouvé');
            return { error: 'Utilisateur non trouvé' };
        }

        const result = await bcrypt.compare(password, userData.Hashedpassword);
        //console.log(result);

        if(result){
            const userData = await userBase.findOne({ email : uEmail },'name email');
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
