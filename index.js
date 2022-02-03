const path = require('path')
require('dotenv').config()


const express = require('express')
const app = express()

const usersRoute = require('./src/routes/users')
const adminRoute = require('./src/routes/admin')
const middlewere = require('./src/middlewere/common')
const commonHelper = require('./src/helper/common')
const morgan = require('morgan')
const cors = require('cors')


//middlewere
app.use(middlewere.myConsole)
app.use(express.json()) 
app.use(morgan('dev'))

app.use(cors())
// routes
app.use('/file', express.static('./image'))
app.use('/users', usersRoute)
app.use('/admin', adminRoute)
// URL NOT FOUND
app.use(commonHelper.notFound)
// Error Handing
app.use(commonHelper.errorHandling)

// console.log(process.env.DB_HOST)
// console.log(process.env.DB_NAME)
// console.log(process.env.DB_PASSWORD)
// console.log(process.env.DB_USER)

const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`Server is running Port : ${PORT}`);
})