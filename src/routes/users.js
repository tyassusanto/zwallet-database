const express = require('express')
const route = express.Router()
const usersController = require('../controller/users')

route.post('/register', usersController.register)
route.post('/login', usersController.login)
route.get('/', usersController.getUsers)
route.get('/', usersController.findAllUsers)
route.put('/:id', usersController.updateUsers)
route.delete('/:id', usersController.deleteUsers)
route.get('/:id', usersController.detailUsers)

module.exports = route