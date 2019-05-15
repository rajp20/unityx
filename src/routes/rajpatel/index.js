require('rootpath')()
// const logger = require('logger/logger')('rajpatel.log')
const express = require('express')
// const bodyParser = require('body-parser')

const router = express.Router()

router.use(express.static(__dirname + '/public'))

//api specific routes
router.get('/', function (req, res) {
    res.sendFile(__dirname + '/web/index/index.html')
});

router.get('/new', function (req, res) {
    res.render(__dirname + '/web/new_index/index')
})

module.exports = router

