const express = require('express')
const route = express.Router()
const usersController = require('../controller/users')
const commonMiddlewere = require('../middlewere/common')

route.post('/register', usersController.register)
route.post('/login', usersController.login)
route.get('/search', usersController.findAllUsers)
route.put('/update/:id', commonMiddlewere.validationUserUpdate, usersController.updateUsers)
route.get('/profile/:id', usersController.detailUsers)

module.exports = route