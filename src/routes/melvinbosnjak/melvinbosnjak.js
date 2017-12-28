require('rootpath')();
const logger      = require('logger/logger')('rajpatel.log');
const express     = require('express');
const config      = require('nconf');
const bodyParser  = require('body-parser');

var router = express.Router();

router.use(express.static(__dirname + '/src'));

//api specific routes
router.get('/', function(req, res) {
  res.sendFile(__dirname + '/src/index.html');
});

module.exports = router;

