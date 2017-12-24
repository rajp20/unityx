require('rootpath')();
const logger      = require('logger/logger');
const express     = require('express');
const config      = require('nconf');
const bodyParser  = require('body-parser');
const subdomain   = require('express-subdomain');
const rajpatelsub = require('src/routes/rajpatel/rajpatel');
const home        = require('src/routes/home/home');


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

let app = express();

app.listen(http_port);

app.use(bodyParser.json());

app.use('/home', home);
app.use(subdomain('rajpatel', rajpatelsub));

logger.info('Server started.');
logger.info(`Server DNS:\t\t${server_dns_name}`);
logger.info(`Server Port:\t\t${http_port}`);
logger.info(`Log Level:\t\t${logger_level}`);
logger.info(``);


module.exports = app;