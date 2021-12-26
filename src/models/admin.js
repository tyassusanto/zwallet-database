const connection = require('../config/connection')

const getUsers = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT id, username, name, balance.wallet FROM users RIGHT JOIN wallet on users.id = wallet.user_id", (error, result) => {
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
module.exports = {
    getUsers,
    deleteUsers
}