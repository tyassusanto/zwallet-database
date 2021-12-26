const connection = require('../config/connection')

const createWallet = (insertDataCreateWallet) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO wallet set ?", insertDataCreateWallet, (error, result)=>{
            if(!error){
                resolve(result)
            }else{  
                reject(error)
            }
        })
    })
}

module.exports = {
    createWallet
}