//  authController.js
const authService = require('../../services/authService');
const loginService = require('../../services/login');
const userBase = require('../../models/userShema')

loginController = async function loginController(req, res) {
    const { email, password } = req.body;
    const loginResult = await loginService.login(email, password);
    
    if (loginResult.accessToken && loginResult.refreshAcessToken) {
        res.json({ accessToken: loginResult.accessToken,
                   refreshToken: loginResult.refreshAcessToken});
    } else {
        res.status(404).json({ message: loginResult.error || 'Erreur lors de l\'authentification' });
    }
}

refreshController = async function refreshController(req,res){
    const { refreshToken } = req.body;
    const newToken = await loginService.refresh(refreshToken);
    if (newToken.accessToken){
        res.json({accessToken : newToken.accessToken});
    } else {
        res.status(404).json({message: newToken.error || 'Erreur d\'authetification avec refreshToken'});
    }

}

module.exports = {
    loginController,
    refreshController
}