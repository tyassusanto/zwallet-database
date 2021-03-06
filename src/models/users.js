const connection = require('../config/connection')

const registerUser = (insertDataRegister) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO users set ?", insertDataRegister, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

// Verifikasi
const verifikationEmail = (email) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE users SET status_verified = 'verified' WHERE email = '${email}'`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const findAllUsers = ({ search, sort, order, limit, offset }) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE name LIKE '%${search}%' ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const updateUsers = (update, id) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE users SET ? WHERE id = ?", [update, id], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

// TAMBAHKAN DENGAN JOIN
const detailUsers = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM users WHERE id = ?", id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const count = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT COUNT (*) as total FROM users", (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

// cek email terdaftar untuk register
const findEmail = (email) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE email = ?`, email, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

// find username untuk login
const findUsername = (username) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE username = ?`, username, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    registerUser,
    findAllUsers,
    updateUsers,
    detailUsers,
    count,
    findEmail,
    findUsername,
    verifikationEmail
}