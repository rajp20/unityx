require('rootpath')();
const logger      = require('logger/logger')('rajpatel.log');
const express     = require('express');
const config      = require('nconf');
const bodyParser  = require('body-parser');

var router = express.Router();

//api specific routes
router.get('/', function(req, res) {
  res.sendFile(__dirname + '/src/index/index.html');
});

module.exports = router;

