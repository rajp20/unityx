require('rootpath')();
const logger      = require('logger/logger')('home.log');
const express     = require('express');
const config      = require('nconf');
const bodyParser  = require('body-parser');

var router = express.Router();

router.use(express.static(__dirname + '/src'));

router.get('/', function(req, res) {
  res.sendFile(__dirname + '/src/index/index.html');
});

module.exports = router;

