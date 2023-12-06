// routes.js
const express = require('express');
const router = express.Router();
const Controllerv2 = require('../api/v2/controller.js');
const ControllerAuth = require('../api/v2/authController.js');
const autRequest = require('../services/authService')

// Version 1 d'API"
router.get('/',Controllerv2.Hi);
router.get('/allDepartement',Controllerv2.baseDepartementShow);
router.post('/addUser',Controllerv2.addUser);
router.post('/login',ControllerAuth.loginController);
router.post('/refresh',ControllerAuth.refreshController);
router.post('/search',autRequest.authenticateToken,Controllerv2.searchHouse);
router.post('/history',autRequest.authenticateToken,Controllerv2.showSearchsByUser);
router.post('/retrySearch',autRequest.authenticateToken,Controllerv2.retrySearch);
router.post('/deleteSearch',autRequest.authenticateToken,Controllerv2.deleteSearch);




// router.get('/userBase',authenticateToken,Controllerv2.userShow);
// router.get('/genToken',authenticateToken,ControllerAuth.generateToken);
// router.post('/login',ControllerAuth.loginFunction);

module.exports = router;