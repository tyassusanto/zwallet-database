const express = require('express')
const app = express()

const usersRoute = require('./src/routes/users')
const middlewere = require('./src/middlewere/common')
const commonHelper = require('./src/helper/common')
const morgan = require('morgan')


//middlewere
app.use(middlewere.myConsole)
app.use(express.json()) 
app.use(morgan('dev'))

// routes
app.use('/users', usersRoute)
// URL NOT FOUND
app.use(commonHelper.notFound)

// Error Handing
app.use(middlewere.errorHandling)

const PORT = 4000
app.listen(PORT,()=>{
    console.log(`Server is running Port : ${PORT}`);
})