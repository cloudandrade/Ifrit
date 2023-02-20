const db = require('../config/database');
const { STRING, INTEGER } = require('sequelize');

const Produtos = db.sequelize.define(
  'Produtos',
  {
    nome: {
      type: STRING,
      required: true,
    },
    descricao: {
      type: INTEGER,
      required: true,
    },
    imgUrl: {
      field: 'img_url',
      type: INTEGER,
      required: true,
    },
    preco_in_cents: {
      field: 'preco_in_cents',
      type: INTEGER,
      required: true,
    },
    preco_old_in_cents: {
      field: 'preco_old_in_cents',
      type: INTEGER,
      required: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    modelName: 'Produtos',
    tableName: 'Produtos',
  }
);

module.exports = Produtos;