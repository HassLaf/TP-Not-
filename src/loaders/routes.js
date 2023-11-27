// routes.js
const express = require('express');
const router = express.Router();
const Controllerv2 = require('../api/v2/controller.js');
const ControllerAuth = require('../api/v2/authController.js');
const autRequest = require('../services/authService')

// Version 1 d'API"
router.get('/',Controllerv2.Hi)
router.post('/addUser',Controllerv2.addUser);
//router.get('/createAccount',Controllerv2.baseShow);



// router.get('/userBase',authenticateToken,Controllerv2.userShow);
// router.get('/genToken',authenticateToken,ControllerAuth.generateToken);
// router.post('/login',ControllerAuth.loginFunction);

module.exports = router;