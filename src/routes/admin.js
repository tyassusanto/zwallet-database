const express = require('express')
const route = express.Router()
const adminController = require('../controller/admin')
const { verifToken } = require('../middlewere/auth')

route.get('/allusers', verifToken, adminController.getUsers)
route.delete('/delete/:id', adminController.deleteUsers)

module.exports = route