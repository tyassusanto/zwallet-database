// ini controller users beneran buat tugas
const createError = require('http-errors') // error response using http-error
const modelUsers = require('../models/users') //users model
const commonHelper = require('../helper/common') //help response / error controller
const {v4 : uuid} = require('uuid') //unic user id
const bcrypt = require('bcrypt') //encrypting user password
// register / create
const register = async (req, res, next)=>{
    try {
    const {username, email, password} = req.body
    const userEmail = await modelUsers.findEmail(email)
    const userUsername = await modelUsers.findUsername(username)
    if(userEmail.length > 0){
        return next(createError(403, 'Email Already Registered'))
    }
    if(userUsername.length > 0){
        return next (createError(403, 'Email Already Registered'))
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const insertDataRegister = {
        id : uuid(),
        username,
        email,
        password : hashPassword
    }
        const resultRegister  = await modelUsers.registerUser(insertDataRegister)
        commonHelper.response(res, insertDataRegister, 201, `Succes Create Account ${username}`)
    } catch (error) {
        res.status(500),
        next({
            status : 500,
            message : 'Internal Server Error'
        })
    }
}

// login user
const login = async (req, res, next) => {
    try {
        const {username, password} = req.body
        const [user] = await modelUsers.findUsername(username)
        if(!user) return next(createError(403, 'Username or Password Incorect'))
        const hashedPassword = await bcrypt.compare(password, user.password)
        if(hashedPassword){
            commonHelper.response(res, null, 200, `Succes Login, Welcome Back ${username}`)
        } else {
            next(createError(403, 'Username or Password Incorect'))
        }
        
    } catch (error) {
        next(createError(403, new createError.InternalServerError))
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
    commonHelper.response(res, update, 200, `Success Update Your Pofile`)
    } catch (error) {
        res.status(500),
        next({
            status : 500,
            message : 'Internal Server Error'
        })
    }
    
}

// // delete
// const deleteUsers = async (req, res, next) => {
//     try {
//         const id = req.params.id
//         const result = await modelUsers.deleteUsers(id)
//         res.status(200)
//         commonHelper.response(res, result, 200, null)
//     } catch (error) {
//         res.status(500),
//         next({
//             status : 500,
//             message : 'Internal Server Error'
//         })
//     }
// }

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
    login,
    findAllUsers,
    updateUsers,
    detailUsers
}