const express = require('express')
const route = express.Router()
const adminController = require('../controller/admin')
const { verifToken, isAdmin } = require('../middlewere/auth')

route.get('/allusers', verifToken, adminController.getUsers)
route.delete('/delete/:id', isAdmin, adminController.deleteUsers)

module.exports = route