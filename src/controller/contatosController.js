const Contatos = require('../model/Contatos');
const logger = require('../config/loggerConfig')
const { Errors } = require('../utils/ErrorsList')

exports.create = async (req, res) => {
  logger.info('Route - POST contato - Registrando novo contato');
  await res.setHeader('Content-Type', 'application/json');
  try {
    let novoContato = req.body;
    logger.info(`Input = ${JSON.stringify(novoContato)}`)
    //validate fields
    if (!novoContato.cpf) {
      return res.status(400).send({ reason: `${Errors.VAL001} - O campo CPF é obrigatório` })
    }
    if (!novoContato.nome) {
      return res.status(400).send({ reason: `${Errors.VAL001} - O campo Nome é obrigatório` })
    }
    if (!novoContato.email) {
      return res.status(400).send({ reason: `${Errors.VAL001} - O campo Email é obrigatório` })
    }
    if (!novoContato.telefone) {
      return res.status(400).send({ reason: `${Errors.VAL001} - O campo Telefone é obrigatório` })
    }
    if (!novoContato.endereco) {
      return res.status(400).json({ reason: `${Errors.VAL001} - O campo Endereço é obrigatório` })
    }

    let cpfFound = await Contatos.findOne({ where: { cpf: novoContato.cpf } })
    cpfFound = cpfFound !== null && cpfFound.dataValues !== null ? cpfFound.dataValues : null

    if (cpfFound) {
      return res.status(400).send({ reason: `${Errors.VAL001} - O CPF informado já foi cadastrado na base de dados` })
    } else {
      let payload = await Contatos.create(novoContato);
      let response = { sucess: true, payload };
      return res.status(201).send(response);
    }

  } catch (error) {
    let payload = 'Falha ao registrar contato:: Error' + error;
    logger.error(payload);
    let response = { sucess: false, payload };

    res.status(500).send(response);
  }
};
