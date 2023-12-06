// routes.js
const express = require('express');
const router = express.Router();
const generalController = require('../api/v2/generalController.js');
const searchController = require('../api/v2/searchController.js');
const ControllerAuth = require('../api/v2/authController.js');
const autRequest = require('../services/authService')

// Controlle d'authentification 

router.post('/login',ControllerAuth.loginController);
router.post('/refresh',ControllerAuth.refreshController);

// Des chemins génèrals.
router.get('/',generalController.Hi);
router.post('/addUser',generalController.addUser);
router.get('/allDepartement',generalController.baseDepartementShow);

// Les chemins qui consernent les recherches.
router.post('/search',autRequest.authenticateToken,searchController.searchHouse);
router.post('/history',autRequest.authenticateToken,searchController.showSearchsByUser);
router.post('/retrySearch',autRequest.authenticateToken,searchController.retrySearch);
router.post('/deleteSearch',autRequest.authenticateToken,searchController.deleteSearch);

module.exports = router;