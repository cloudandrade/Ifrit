const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userController = require('./controllers/userController');

const {
	checkAuthorization
  } = require('./service/authService');

router.get('/', async (req, res) => {
	res.send('Geek Store Api server online');
});

router.post('/player/register', userController.createUser);

router.post('/player/login', userController.login);

router.get('/player/:id',  checkAuthorization, userController.getUserDetails);

module.exports = router;