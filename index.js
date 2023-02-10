const express = require('express');
require('dotenv').config();
const cors = require('cors');
const logger = require('./src/config/loggerConfig');

logger.debug('## Start Checking Environment Variables ##');
logger.debug('API_PORT: ' + process.env.API_PORT);
logger.debug('API_HOST: ' + process.env.API_HOST);
logger.debug('LOG_SERVICE_TYPE: ' + process.env.LOG_SERVICE_TYPE);
logger.debug('## End Checking Environment Variables ##');

//EXPRESS
const app = express();

//SERVER PORT
const PORT = process.env.API_PORT || 5000;

const HOST = process.env.API_HOST || 'localhost';

app.use(cors());

app.get('/', (req, res) => res.send('server get requisition'));

//SERVER
app.listen(PORT, logger.info(`Servidor Iniciado em: ${HOST}:${PORT}`.bgBlue));
