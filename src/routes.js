const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userController = require('./controllers/userController');

router.get('/', async (req, res) => {
	res.send('Geek Store Api server online');
});

router.post('/player', userController.createUser);

module.exports = router;