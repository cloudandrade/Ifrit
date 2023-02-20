const { Router } = require('express');
const contatosController = require('../controller/contatosController');
const produtosController = require('../controller/produtosController');
const pedidosController = require('../controller/pedidosController');

const routes = Router();

routes.get('/', (req, res) => res.send('server online'));
routes.post('/contatos', contatosController.create);
routes.get('/produtos', produtosController.get);
routes.post('/pedidos', pedidosController.create)

module.exports = routes;