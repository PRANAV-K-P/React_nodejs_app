const express = require('express')
const router = express.Router()
const Controller = require('../Controllers/AdminController')

router
    .post('/',Controller.AdminLogin)
    .get('/users',Controller.getAllUsers)
    .get('/search/:key',Controller.searchInUsers)

module.exports = router;