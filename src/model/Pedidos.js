const db = require('../config/database');
const { INTEGER, DATE } = require('sequelize');

const Pedidos = db.sequelize.define(
  'Pedidos',
  {
    dataInicio: {
      type: DATE,
      required: true,
      field: 'data_inicio'
    },
    dataFim: {
      type: DATE,
      required: true,
      field: 'data_fim'
    },
    status: {
      type: INTEGER,
      required: true,
    },
    contatoId: {
      field: 'contato_id',
      type: INTEGER,
      required: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    modelName: 'Pedidos',
    tableName: 'Pedidos',
  }
);

/*Ala.sync({
    force: true
})*/
module.exports = Pedidos;