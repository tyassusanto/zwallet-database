const modelAdmin = require('../models/admin')
const commonHelper = require('../helper/common')

// get all users data by admin
const getUsers = async (req, res, next) => {
    try {
        const search = req.query.name || '%%'
        const result = await modelAdmin.getUsers({search})
        res.status(200)
        commonHelper.response(res, result, 200, `Success Get All Data Users`)
    } catch (error) {
        res.status(500),
        next({
            status : 500,
            message : 'Internal Server Error'
        })
    }
}

// detele users by admin
const deleteUsers = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await modelAdmin.deleteUsers(id)
        console.log(id);
        res.status(200)
        commonHelper.response(res, result, 200, `User id : ${id}, Deleted !`)
    } catch (error) {
        res.status(500),
        next({
            status : 500,
            message : 'Internal Server Error'
        })
    }
}

module.exports = {
    getUsers,
    deleteUsers
}