const { Router } = require('express');
const contatosController = require('../controller/contatosController');
const produtosController = require('../controller/produtosController');

const routes = Router();

routes.get('/', (req, res) => res.send('server online'));
routes.post('/contatos', contatosController.create);
routes.get('/produtos', produtosController.get);

module.exports = routes;