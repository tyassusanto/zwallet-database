const express = require('express')
const route = express.Router()
const adminController = require('../controller/admin')

route.get('/allusers', adminController.getUsers)
route.delete('/delete/:id', adminController.deleteUsers)

module.exports = route