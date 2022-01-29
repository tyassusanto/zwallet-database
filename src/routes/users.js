const express = require('express')
const route = express.Router()
const usersController = require('../controller/users')
const commonMiddlewere = require('../middlewere/common')
const walletController = require('../controller/wallet')
const { verifToken } = require('../middlewere/auth')
const { upload } = require('../middlewere/upload')

route.post('/register', usersController.register)
route.post('/login', usersController.login)
route.get('/search', verifToken, usersController.findAllUsers)
route.put('/update/:id', upload.single('photo'), commonMiddlewere.validationUserUpdate, usersController.updateUsers)
route.get('/profile', verifToken, usersController.userProfile)
route.get('/profile/:id', usersController.detailUsers)


route.post('/wallet', walletController.createWallet)

module.exports = route