const modelWallet = require('../models/wallet') //users model
const commonHelper = require('../helper/common') //help response / error controller


const createWallet = async (req, res, next) => {
    try {
        const {user_id} = req.body
        const insertDataWallet = {user_id}
        const resultCreateWallet = await modelWallet.createWallet(insertDataWallet)
        commonHelper.response(res, insertDataWallet, 200, 'Success')
    } catch (error) {
        res.status(500)
        next({
            status : 500,
            message : 'Internal Server Error'
        })
    }
}



module.exports = {
    createWallet
}