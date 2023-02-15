const Sequelize = require('sequelize');
const logger = require('../config/loggerConfig');
//conexão com o banco de dados mysql

const dbname = process.env.DB_NAME;
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASS;
const dbhost = process.env.DB_HOST;

const sequelize = new Sequelize(dbname, dbuser, dbpass, {
	host: dbhost,
	dialect: 'mysql',
	raw: true
});

sequelize
	.authenticate()
	.then(() => {
		logger.info('Banco de dados conectado com sucesso.'.bgBlue);
	})
	.catch((err) => {
		logger.error('Não foi possível se conectar ao banco de dados:'.bgRed, err);
	});

module.exports = {
	Sequelize,
	sequelize,
};
