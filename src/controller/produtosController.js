const Produtos = require('../model/Produtos');
const logger = require('../config/loggerConfig')
const { getPagination } = require('../utils/Paginate')
const { Op } = require('sequelize')

exports.get = async (req, res) => {
  logger.info('Route - Get produtos - Obtendo produtos');
  await res.setHeader('Content-Type', 'application/json');
  let { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  try {

    let options = req.query.search ? {
      limit: limit,
      offset: offset,
      where: {
        nome: {
          [Op.substring]: `${req.query.search}`
        }
      }
    } : {
      limit: limit,
      offset: offset
    }

    const produtos = await Produtos.findAndCountAll(options);

    res.status(200).json(produtos)
  } catch (error) {
    logger.error('Erro ao buscar Produtos :: ' + error)
    res.status(500).send('Error: ' + error)
  }

};