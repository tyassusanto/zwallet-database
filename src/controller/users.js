// ini controller users beneran buat tugas
const modelUsers = require('../models/users')
const commonHelper = require('../helper/common')
// register / create
const register = async (req, res, next)=>{
    try {
    const {id, username, email, password} = req.body
    const insertDataUsers = {
        id,
        username,
        email,
        password
    }
        const result  = await modelUsers.registerUser(insertDataUsers)
        res.status(200)
        commonHelper.response(res, result, 200, null)
    } catch (error) {
        res.status(500),
        next({
            status : 500,
            message : 'Internal Server Error'
        })
    }
}

// get all users data 
const getUsers = async (req, res, nexy) => {
    try {
        const result = await modelUsers.getUsers()
        res.status(200)
        res.json({
            status : 'Success',
            code : 200,
            data : result,
            message : "Success Get All Data Users"
        })
    } catch (error) {
        res.status(500),
        next({
            status : 500,
            message : 'Internal Server Error'
        })
    }
}

// find all users 
const findAllUsers  = async (req, res, next) => {
    try {
        const search = req.query.name || '%%'
        const sort = req.query.sort
        const order = req.query.order || 'desc'
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 2
        const offset = (page - 1) * limit
        const result = await modelUsers.findAllUsers({
            search,
            sort,
            order,
            limit,
            offset
        })
        const [{total}] = await modelUsers.count()
        console.log(total);
        res.status(200)
        commonHelper.response(res, result, 200, null,{
            currentPage : page,
            limitData : limit,
            totalUsers : total,
            totalPage : Math.ceil(total / limit)
        })
    } catch (error) {
        res.status(500),
        next({
            status : 500,
            message : 'Internal Server Error'
        })
    }
}

// update
const updateUsers = async (req, res, next) => {
    try {
        const id = req.params.id
        const {name, phone} = req.body
        const update = {
            name,
            phone,
            updated_at : new Date()
        }
    const result  = await modelUsers.updateUsers(update, id)
    res.status(200)
    commonHelper.response(res, result, 200, null)
    } catch (error) {
        res.status(500),
        next({
            status : 500,
            message : 'Internal Server Error'
        })
    }
    
}

// delete
const deleteUsers = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await modelUsers.deleteUsers(id)
        res.status(200)
        commonHelper.response(res, result, 200, null)
    } catch (error) {
        res.status(500),
        next({
            status : 500,
            message : 'Internal Server Error'
        })
    }
}

// JOIN DENGAN TABLE WALLET
const detailUsers = async (req, res, next) => {
    try {
        const id = req.params.id
        const [result] = await modelUsers.detailUsers(id)
        res.json({
            message : `Detail Users id : ${id}`,
            result
        })
    } catch (error) {
        res.status(500),
        next({
            status : 500,
            message : 'Internal Server Error'
        })
    }
    
}

module.exports = {
    register,
    findAllUsers,
    getUsers,
    updateUsers,
    deleteUsers,
    detailUsers
}