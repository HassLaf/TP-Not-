//  authController.js
const authService = require('../../services/authService');
const loginService = require('../../services/login');
const userBase = require('../../models/userShema')

loginFunction = async function loginFunction(req, res) {
    const { email, password } = req.body;
    const loginResult = await loginService.login(email, password);
    console.log(loginResult.accessToken);
    if (loginResult.accessToken) {
        res.json({ accessToken: loginResult.accessToken });
    } else {
        res.status(404).json({ message: loginResult.error || 'Erreur lors de l\'authentification' });
    }
}

module.exports = {
    loginFunction,
}