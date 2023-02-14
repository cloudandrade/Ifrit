const db = require('../config/database');
const { STRING } = require('sequelize');

const Contatos = db.sequelize.define(
  'Contatos',
  {
    nome: {
      type: STRING,
      required: true,
    },
    telefone: {
      type: STRING,
      required: true,
    },
    endereco: {
      type: STRING,
      required: true,
    },
    email: {
      type: STRING,
      required: true,
    },
    cpf: {
      type: STRING,
      required: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    modelName: 'Contatos',
    tableName: 'Contatos',
  }
);

module.exports = Contatos;