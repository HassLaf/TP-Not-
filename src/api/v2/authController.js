//  authController.js
const authService = require('../../services/authService');
const loginService = require('../../services/login');
const userBase = require('../../models/userShema')

loginFunction = async function loginFunction(req, res) {
    const { userName, password } = req.body;
    const loginResult = await loginService.login(userName, password);

    if (loginResult.accessToken) {
        res.json({ accessToken: loginResult.accessToken });
    } else {
        res.status(404).json({ message: loginResult.error || 'Erreur lors de l\'authentification' });
    }
}

generateToken = async function generateToken(req,res){
    console.log('Reached the generateToken function'); // Ajout de ce log
    const user = await userBase.findOne({ name: 'yann guillerm' });
    console.log(user.toObject());
    const accessToken = authService.generateAccessToken(user.toObject())
    console.log('accessToken', accessToken);
    res.json({ accessToken })
}

module.exports = {
    generateToken,
    loginFunction
}