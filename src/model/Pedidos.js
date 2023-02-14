const db = require('../config/database');
const { INTEGER, DATE } = require('sequelize');

const Pedidos = db.sequelize.define(
  'Pedidos',
  {
    data_inicio: {
      type: DATE,
      required: true,
    },
    data_fim: {
      type: DATE,
      required: true,
    },
    status: {
      type: INTEGER,
      required: true,
    },
    contato_id: {
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