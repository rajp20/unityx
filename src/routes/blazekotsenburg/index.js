require('rootpath')()
const logger      = require('logger/logger')('rajpatel.log')
const express     = require('express')
const bodyParser  = require('body-parser')

var router = express.Router()

router.use(express.static(__dirname + '/public'))

//api specific routes
router.get('/', function(req, res) {
    res.sendFile(__dirname + '/web/index/index.html')
})

router.get('/about_me', function(req, res) {
    res.sendFile(__dirname + '/web/about_me.html')
})

router.get('/resume', function(req, res) {
    res.sendFile(__dirname + '/web/resume.html')
})

router.get('/experience', function(req, res) {
    res.sendFile(__dirname + '/web/experience.html')
})

router.get('/skills', function(req, res) {
    res.sendFile(__dirname + '/web/skills.html')
})

router.get('/coursework', function(req, res) {
    res.sendFile(__dirname + '/web/coursework.html')
})

router.get('/projects', function(req, res) {
    res.sendFile(__dirname + '/web/projects.html')
})

module.exports = router

