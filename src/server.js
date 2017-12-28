require('rootpath')();
const logger      = require('logger/logger')('server.log');
const express     = require('express');
const config      = require('nconf');
const bodyParser  = require('body-parser');
const subdomain   = require('express-subdomain');
const rajpatelsub = require('src/routes/rajpatel/rajpatel');
const jakemaschoff = require('src/routes/jakemaschoff/jakemaschoff');
const melvinbosnjak = require('src/routes/melvinbosnjak/melvinbosnjak');
const home        = require('src/routes/root/root');

'use strict';

const env = process.env.NODE_ENV;

if (!env) {
  logger.crit(`You must define an environment to run unityx.`);
  return 1;
}

config.argv()
  .env()
  .file({ file: `config/${env}.config.json`});

const logger_level = config.get('log_level');
const server_dns_name = config.get('server_dns_name');
const http_port = config.get('http_port');
const https_port = config.get('https_port');
const letsencrypt_server = config.get('letsencrypt_server');

// returns an instance of node-greenlock with additional helper methods
var lex = require('greenlock-express').create({
  // set to https://acme-v01.api.letsencrypt.org/directory in production
  server: letsencrypt_server

// If you wish to replace the default plugins, you may do so here
//
  , challenges: { 'http-01': require('le-challenge-fs').create({ webrootPath: '/tmp/acme-challenges' }) }
  , store: require('le-store-certbot').create({ webrootPath: '/tmp/acme-challenges' })

// You probably wouldn't need to replace the default sni handler
// See https://git.daplie.com/Daplie/le-sni-auto if you think you do
//, sni: require('le-sni-auto').create({})

  , approveDomains: approveDomains
});

function approveDomains(opts, certs, cb) {
  // This is where you check your database and associated
  // email addresses with domains and agreements and such


  // The domains being approved for the first time are listed in opts.domains
  // Certs being renewed are listed in certs.altnames
  if (certs) {
    opts.domains = certs.altnames;
  }
  else {
    opts.email = 'rajpatel0820@gmail.com';
    opts.agreeTos = true;
  }

  // NOTE: you can also change other options such as `challengeType` and `challenge`
  // opts.challengeType = 'http-01';
  // opts.challenge = require('le-challenge-fs').create({});

  cb(null, { options: opts, certs: certs });
}

process.on('uncaughtException', function (err) {
  logger.fatal(`${(new Date ()).toUTCString()}: uncaughtException: '${err.message}'. Stack Trace To Follow.`);
  logger.fatal(err.stack);
  process.exit(1);
});

let app = express();

if (env == "development") {
  app.listen(http_port);
} else {
  // handles acme-challenge and redirects to https
  require('http').createServer(lex.middleware(require('redirect-https')())).listen(http_port, function () {
    logger.debug("Listening for ACME http-01 challenges on", this.address());
  });

  // handles your app
  require('https').createServer(lex.httpsOptions, lex.middleware(app)).listen(https_port, function () {
    logger.debug("Listening for ACME tls-sni-01 challenges and serve app on", this.address());
  });
}

// Subdomains routing
app.use(subdomain('rajpatel', rajpatelsub));
app.use(subdomain('jakemaschoff', jakemaschoff));
app.use(subdomain('melvinbosnjak', melvinbosnjak));
app.use('/', home);
app.use(bodyParser.json());

logger.info('Server started.');
logger.info(`Server DNS:\t\t${server_dns_name}`);
logger.info(`Server Port:\t\t${http_port}`);
logger.info(`Server SSL Port:\t${https_port}`);
logger.info(`Log Level:\t\t${logger_level}`);
logger.info(``);
logger.info(`Sub-Domains`);
logger.info(`rajpatel.${server_dns_name}`);
logger.info(`jakemaschoff.${server_dns_name}`);
logger.info(`melvinbosnjak.${server_dns_name}`);
logger.info(``);

module.exports = app;