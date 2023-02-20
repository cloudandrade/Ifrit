const db = require('../config/database');
const { STRING, INTEGER } = require('sequelize');

const PedidosContato = db.sequelize.define(
  'PedidosContato',
  {
    quantidade: {
      type: INTEGER,
      required: true,
    },
    tamanho: {
      type: STRING,
      required: true,
    },
    produtoId: {
      field: 'produto_id',
      type: INTEGER,
      required: true,
    },
    pedidoId: {
      field: 'pedido_id',
      type: INTEGER,
      required: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    modelName: 'PedidosContato',
    tableName: 'Pedidos_Contato',
  }
);

module.exports = PedidosContato;