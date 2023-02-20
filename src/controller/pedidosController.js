const Pedidos = require('../model/Pedidos');
const PedidosContatos = require('../model/PedidosContato')
const Contatos = require('../model/Contatos')
const logger = require('../config/loggerConfig')
const { Errors } = require('../utils/ErrorsList')
const { Status } = require('../utils/ConstantHelper')

exports.create = async (req, res) => {
  logger.info('Route - POST pedidos - Registrando novo pedido');
  await res.setHeader('Content-Type', 'application/json');
  try {

    /**
     *  @example
     * {
          contatoId: '1',
          pedidos: [
            {
              quantidade: 1,
              tamanho: 'G',
              produtoId: 4
            },
            {
              quantidade: 1,
              tamanho: 'P',
              produtoId: 7
            },
          ]
        }
     */


    let listaPedidos = req.body;
    logger.info(`Input = ${JSON.stringify(listaPedidos)}`)

    if (!req.body.contatoId) {
      return res.status(400).send({ reason: `${Errors.VAL001} - O Id do contato é obrigatório` })
    }

    const contatoFound = await Contatos.findOne({ where: { id: req.body.contatoId } })

    if (!contatoFound) {
      return res.status(400).send({ reason: `${Errors.VAL001} - Contato não encontrado na base de dados` })
    }

    const novoPedido = {
      dataInicio: new Date(),
      dataFim: null,
      status: Status.SOLICITADO,
      contatoId: contatoFound.id
    }

    const pedidoCriado = await Pedidos.create(novoPedido);
    let pedido = {
      id: pedidoCriado.id,
      dataInicio: pedidoCriado.dataInicio,
      status: pedidoCriado.status,
      contatoId: pedidoCriado.contatoId,
    }

    let itens = []
    listaPedidos.pedidos.forEach(async (item) => {
      let itemPedido = {
        quantidade: item.quantidade,
        tamanho: item.tamanho,
        pedidoId: pedidoCriado.id,
        produtoId: item.produtoId
      }
      await PedidosContatos.create(itemPedido);
    });

    let response = { sucess: true, payload: pedido };
    return res.status(201).send(response);

  } catch (error) {
    let payload = 'Falha ao cadastrar pedidos:: Error' + error;
    logger.error(payload);
    let response = { sucess: false, payload };
    res.status(500).send(response);
  }
};

