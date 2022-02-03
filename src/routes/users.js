const express = require('express')
const route = express.Router()
const usersController = require('../controller/users')
const commonMiddlewere = require('../middlewere/common')
const walletController = require('../controller/wallet')
const { verifToken } = require('../middlewere/auth')
const { upload } = require('../middlewere/upload')

route.post('/register', usersController.register)
route.post('/login', usersController.login)
route.get('/search', verifToken, usersController.findAllUsers) //need verifikation
route.put('/update/:id', verifToken, upload.single('photo'), commonMiddlewere.validationUserUpdate, usersController.updateUsers)
route.get('/profile', verifToken, usersController.userProfile) //need verifikation
route.get('/profile/:id', verifToken, usersController.detailUsers)
// route.get('/verification/:id', commonMiddlewere.emailTokenVerification)

route.post('/wallet', walletController.createWallet)

module.exports = route