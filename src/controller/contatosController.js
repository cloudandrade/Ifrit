const Contatos = require('../model/Contatos');
const logger = require('../config/loggerConfig')

exports.create = async (req, res) => {
  logger.info('Route - Registrando novo contato');
  let novoContato = req.body;
  logger.info(`Input = ${JSON.stringify(novoContato)}`)

  try {
    let payload = await Contatos.create(novoContato);
    let response = { sucess: true, payload };
    return res.send(response);
  } catch (error) {
    let payload = 'Falha ao registrar contato:: Error' + error;
    logger.error(payload);
    let response = { sucess: false, payload };
    res.status(500).send(response);
  }
};
