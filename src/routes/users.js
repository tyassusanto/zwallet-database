const express = require('express')
const route = express.Router()
const usersController = require('../controller/users')

route.post('/', usersController.register)
route.get('/', usersController.getUsers)
route.get('/', usersController.findAllUsers)
// route.get('/', usersController.getUsers)
route.put('/:id', usersController.updateUsers)
route.delete('/:id', usersController.deleteUsers)
route.get('/:id', usersController.detailUsers)

module.exports = route