require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection({
    // host : "34.205.92.193",
    // user : "fazz3adityas",
    // password : "nasusaFazz1234#",
    // database : "fazz3adityas_zeewalet"
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
})

module.exports = connection