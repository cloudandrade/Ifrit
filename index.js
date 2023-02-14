const express = require('express');
var bodyParser = require('body-parser')
require('dotenv').config();
const cors = require('cors');
const logger = require('./src/config/loggerConfig');
const dbInit = require('./src/config/database');
const routes = require('./src/routes');

logger.debug('## Start Checking Environment Variables ##');
logger.debug('API_PORT: ' + process.env.API_PORT);
logger.debug('API_HOST: ' + process.env.API_HOST);
logger.debug('LOG_SERVICE_TYPE: ' + process.env.LOG_SERVICE_TYPE);
logger.debug('## End Checking Environment Variables ##');

//EXPRESS
const app = express();

//Database inicialization
dbInit;

//SERVER PORT
const PORT = process.env.API_PORT || 5000;

const HOST = process.env.API_HOST || 'localhost';

app.use(cors());

// parse application/json
app.use(bodyParser.json())
app.use(routes);

//SERVER
app.listen(PORT, logger.info(`Servidor Iniciado em: ${HOST}:${PORT}`.bgBlue));
