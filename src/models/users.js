const connection = require('../config/connection')

const insertUsers = (inserDataUsers) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO users set ?", inserDataUsers, (error, result)=>{
            if(!error){
                resolve(result)
            }else{  
                reject(error)
            }
        })
    })
}

// const getUsers = () => {
//     return new Promise((resolve, reject) => {
//         connection.query("SELECT * FROM users", (error, result) => {
//             if(!error){
//                 resolve(result)
//             }else{
//                 reject(error)
//             }
//         })
//     })
// }

const findAllUsers = ({search, sort, order, limit, offset}) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE name LIKE '%${search}%' ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`,(error, result)=>{
        if(!error){
            resolve(result)
        }else{
            reject(error)
        }
        })
    })
}

const updateUsers = (update, id) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE users SET ? WHERE id = ?", [update, id], (error, result) => {
            if(!error){
                resolve(result)
            }else{
                reject(error)
            }
        })
    })
}

const deleteUsers = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM users WHERE id = ?", id, (error, result) => {
            if(!error){
                resolve(result)
            }else{
                reject(error)
            }
        })
    })
}
// TAMBAHKAN DENGAN JOIN
const detailUsers = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM users WHERE id = ?", id, (error, result) => {
            if(!error){
                resolve(result)
            }else{
                reject(error)
            }
        })
    })
}

const count = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT COUNT (*) as total FROM users", (error, result) => {
            if(!error){
                resolve(result)
            }else{
                reject(error)
            }
        })
    })
}

module.exports = {
    insertUsers,
    findAllUsers,
    // getUsers,
    updateUsers,
    deleteUsers,
    detailUsers,
    count
}