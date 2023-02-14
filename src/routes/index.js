const { Router } = require('express');
const contatosController = require('../controller/contatosController');

const routes = Router();

routes.get('/', (req, res) => res.send('server online'));
routes.post('/contato', contatosController.create);

module.exports = routes;