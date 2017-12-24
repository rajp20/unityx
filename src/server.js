require('rootpath')();
const logger      = require('logger/logger');
const express     = require('express');
const config      = require('nconf');
const bodyParser  = require('body-parser');
const subdomain   = require('express-subdomain');


process.on('uncaughtException', function (err) {
  logger.fatal(`${(new Date ()).toUTCString()}: uncaughtException: '${err.message}'. Stack Trace To Follow.`);
  logger.fatal(err.stack);
  process.exit(1);
});

const env = process.env.NODE_ENV;

if (!env) {
  logger.crit(`You must define an environment to run the slack api app.`);
  return 1;
}

config.argv()
  .env()
  .file({ file: `config/${env}.config.json`});

const logger_level = config.get('log_level');
const server_dns_name = config.get('server_dns_name');
const http_port = config.get('http_port');

const slack_integration = config.get('slack_integration');

const socket_io_servers = config.get('socket_io_servers');

if (!socket_io_servers) {
  logger.crit(`No Socket.io server defined in the config.`);
  return 1;
}

let app = express();

app.listen(http_port);

app.use(bodyParser.json());

logger.info('Server started.');
logger.info(`Server DNS:\t\t${server_dns_name}`);
logger.info(`Server Port:\t\t${http_port}`);
logger.info(`Log Level:\t\t${logger_level}`);
logger.info(``);
logger.info(`[Socket.io Info]`);
logger.info(`Socket.io Servers:\t${socket_io_servers}`);
logger.info(``);


module.exports = app;