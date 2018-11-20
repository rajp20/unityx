require('rootpath')()
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('logger/logger')('server.log')
const sub_domain = require('express-subdomain')

// SUB-DOMAINS
const raj_patel = require('src/routes/rajpatel/index')
const jake_maschoff = require('src/routes/jakemaschoff/index')
const melvin_bosnjak = require('src/routes/melvinbosnjak/index')
const adam_lee = require('src/routes/adamlee/index')
const luke_kingsley = require('src/routes/lukekingsley/index')
const blaze_kotsenburg = require('src/routes/blazekotsenburg/index')
const shiv_patel = require('src/routes/shivpatel/index')
const brandon_ward = require('src/routes/brandonward/index')
const magicdrawing = require('src/routes/magicdrawing/index')
const home = require('src/routes/root/index')

'use strict'

// CONFIG
const env = process.env.NODE_ENV
const config = require(`config/${env}.config.js`)

// ERROR CHECKING
if (!env) {
    logger.crit(`You must define an environment to run unityx.`)
    return 1
}

process.on('uncaughtException', function (err) {
    logger.fatal(`${(new Date()).toUTCString()}: uncaughtException: '${err.message}'. Stack Trace To Follow.`)
    logger.fatal(err.stack)
    process.exit(1)
})

// SSL STUFF
// returns an instance of node-greenlock with additional helper methods
let glx = require('greenlock-express').create({
    server: config.ssl_server,
    // Note: If at first you don't succeed, stop and switch to staging:
    // https://acme-staging-v02.api.letsencrypt.org/directory
    version: 'draft-11',
    // If you wish to replace the default plugins, you may do so here
    store: require('le-store-certbot').create({
        configDir: require('path').join(require('os').homedir(), 'acme', 'etc'),
        webrootPath: '/tmp/acme-challenges'
    }),
    telemetry: true,
    approveDomains: approveDomains
})

let http01 = require('le-challenge-fs').create({ webrootPath: '/tmp/acme-challenges' })
function approveDomains(opts, certs, cb) {
    // This is where you check your database and associated
    // email addresses with domains and agreements and such

    // opts.communityMember = true

    opts.challanges = { 'http-01': http01 }

    // The domains being approved for the first time are listed in opts.domains
    // Certs being renewed are listed in certs.altnames
    if (certs) {
        opts.domains = certs.altnames
    }
    else {
        opts.email = 'rajpatel0820@gmail.com'
        opts.agreeTos = true
    }

    // NOTE: you can also change other options such as `challengeType` and `challenge`
    // opts.challengeType = 'http-01'
    // opts.challenge = require('le-challenge-fs').create({})

    cb(null, {options: opts, certs: certs})
}

let app = express()

if (env === "development") {
    app.listen(config.port)
} else {
    // handles acme-challenge and redirects to https
    require('http').createServer(glx.middleware(require('redirect-https')())).listen(config.port, function () {
        logger.debug("Listening for ACME http-01 challenges on", this.address())
    })

    // handles your app
    require('https').createServer(glx.httpsOptions, app).listen(config.ssl_port, function () {
        logger.debug("Listening for ACME tls-sni-01 challenges and serve app on", this.address())
    })
}

// VIEW ENGINE
app.set('view engine', 'pug')

// SUB-DOMAINS
app.use(sub_domain('rajpatel', raj_patel))
app.use(sub_domain('jakemaschoff', jake_maschoff))
app.use(sub_domain('melvinbosnjak', melvin_bosnjak))
app.use(sub_domain('adamlee', adam_lee))
app.use(sub_domain('lukekingsley', luke_kingsley))
app.use(sub_domain('blazekotsenburg', blaze_kotsenburg))
app.use(sub_domain('shivpatel', shiv_patel))
app.use(sub_domain('brandonward', brandon_ward))
app.use(sub_domain('magicdrawing', magicdrawing))
app.use('/', home)
app.use(bodyParser.json())

logger.info('Server started.')
logger.info(`Server DNS:\t\t${config.domain}`)
logger.info(`Server Port:\t\t${config.port}`)
logger.info(`Server SSL Port:\t${config.ssl_server}`)
logger.info(`Log Level:\t\t${config.log_level}`)
logger.info(``)

module.exports = app