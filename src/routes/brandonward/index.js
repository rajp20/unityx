require('rootpath')();
const logger      = require('logger/logger')('rajpatel.log');
const express     = require('express');
const bodyParser  = require('body-parser');

var router = express.Router();

//api specific routes
router.get('/', function(req, res) {
  res.send('hello world');
});

module.exports = router;

