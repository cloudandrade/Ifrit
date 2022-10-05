const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');
const cors = require('cors');

const logger =  require('./src/config/loggerConfig');

logger.debug('## Start Checking Environment Variables ##');
logger.debug('API_PORT: ' + process.env.API_PORT);
logger.debug('API_HOST: ' + process.env.API_HOST);
logger.debug('DB_NAME: ' + process.env.DB_NAME);
//logger.debug('DBUSER: ' + process.env.DBUSER);
//logger.debug('DBPASS: ' + process.env.DBPASS);
logger.debug('DB_HOST: ' + process.env.DB_HOST);
//logger.debug('DBPORT: ' + process.env.DBPORT);
//logger.debug('JWT_SECRET: ' + process.env.JWT_SECRET);
logger.debug('LOG_SERVICE_TYPE: ' + process.env.LOG_SERVICE_TYPE);
logger.debug('## End Checking Environment Variables ##');

//EXPRESS
const app = express();

//SERVER PORT
const PORT = process.env.API_PORT || 5000;

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

//ROUTES
app.use('/', require('./src/routes'));

if(process.env.STAGE === 'local'){
	//MONGO LOCAL
	mongoose.Promise = global.Promise;
mongoose
	.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, { useNewUrlParser: true })
	.then(() => {
		logger.info('DB Connection - Mongodb connected...');
	})
	.catch((erro) => {
		logger.error('DB Connection Error: Houve um problema ao se conectar ao banco de dados, erro: ' + erro);
	});
} else {
	//MONGO ONLINE
const db = require('./src/config/dbKeys').MongoURI;
mongoose
	.connect(db, {
		useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1
	})
	.then(() => {
		logger.info(`. . . AtlasDb Connected . . .`.bgGreen);
	})
	.catch((err) => {
		logger.error(`Falha ao Conectar ao banco online Atlas: `.bgRed + err);
		console.log(err);
	});

}

//SERVER
app.listen(
	PORT,
	logger.info(`Servidor Iniciado em: ${process.env.API_HOST}:${PORT}`.bgBlue)
);