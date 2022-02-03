// ini controller users beneran buat tugas
const createError = require('http-errors') // error response using http-error
const modelUsers = require('../models/users') //users model
const commonHelper = require('../helper/common') //help response / error controller
const { v4: uuid } = require('uuid') //unic user id
const bcrypt = require('bcrypt') //encrypting user password
const jwt = require('jsonwebtoken')
const client = require('../config/redis')

// register / create
const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const userEmail = await modelUsers.findEmail(email)
        const userUsername = await modelUsers.findUsername(username)
        if (userEmail.length > 0) {
            return next(createError(403, 'Email Already Registered'))
        }
        if (userUsername.length > 0) {
            return next(createError(403, 'Username Already Registered'))
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const insertDataRegister = {
            id: uuid(),
            username,
            email,
            password: hashPassword,
            status_verified : 'unverified'
        }
        const resultRegister = await modelUsers.registerUser(insertDataRegister)
        commonHelper.sendEmail(email)
        commonHelper.response(res, resultRegister, 201, `Succes Create Account ${username}`)
    } catch (error) {
        res.status(500),
            next({
                status: 500,
                message: 'Internal Server Error'
            })
    }
}

// login user
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const [user] = await modelUsers.findUsername(username)
        if (!user) return next(createError(403, 'Username or Password Incorect'))
        const hashedPassword = await bcrypt.compare(password, user.password)
        // const result = {
        //     id : user.id,
        //     username : user.username,
        //     name : user.name,
        //     email : user.email,
        //     phone : user.phone,
        //     created_at : user.created_at,
        //     updated_at : user.updated_at
        // }
        // console.log(result);
        if (!hashedPassword) return next(createError(403, 'Incorect Username or Password'))
        const secretKey = process.env.SECRET_KEY_JWT
        const payload = {
            email: user.email,
            name: user.name,
            role: user.role
        }
        const verifToken = {
            expiresIn: '1 day'
        }
        const token = jwt.sign(payload, secretKey, verifToken)
        user.token = token
        const result = {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            phone: user.phone,
            photo: user.photo,
            token,
            role: user.role
        }
        commonHelper.response(res, result, 200, `Succes Login, Welcome Back ${username}`)

    } catch (error) {
        next(createError(500, new createError.InternalServerError()))
        // res.status(500),
        // next({
        //     status : 500,
        //     message : 'Internal Server Error'
        // })
    }
}

// find all users 
const findAllUsers = async (req, res, next) => {
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
        const [{ total }] = await modelUsers.count()
        console.log(total);
        res.status(200)
        commonHelper.response(res, result, 200, null, {
            currentPage: page,
            limitData: limit,
            totalUsers: total,
            totalPage: Math.ceil(total / limit)
        })
    } catch (error) {
        res.status(500),
            next({
                status: 500,
                message: 'Internal Server Error'
            })
    }
}

// update
const updateUsers = async (req, res, next) => {
    // console.log(req.file);
    try {
        const id = req.params.id
        const { name, phone } = req.body
        const fileName = req.file.filename
        const update = {
            name,
            phone,
            photo : `localhost:3500/file/${fileName}`,
            updated_at: new Date()
        }
        const result = await modelUsers.updateUsers(update, id)
        res.status(200)
        commonHelper.response(res, update, 200, `Success Update Your Pofile`)
    } catch (error) {
        res.status(500),
            next({
                status: 500,
                message: 'Internal Server Error'
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
        await client.setEx(`users/${id}`, 60 * 60, JSON.stringify(result))
        res.json({
            message: `Detail Users id : ${id}`,
            result: {
                id: result.id,
                username: result.username,
                name: result.name,
                email: result.email,
                phone: result.phone,
                pin: result.pin
            }
        })
    } catch (error) {
        res.status(500),
            next({
                status: 500,
                message: 'Internal Server Error'
            })
    }

}

const userProfile = async (req, res, next) => {
    const email = req.email
    const users = await modelUsers.findEmail(email)
    // console.log(users);
    // const result = {
    //     id: users.id,
    //     username: users.username,
    //     name: users.name,
    //     email: users.email,
    //     phone: users.phone,
    //     pin: users.pin
    // }
    commonHelper.response(res, users, 200)
}

module.exports = {
    register,
    login,
    findAllUsers,
    updateUsers,
    detailUsers,
    userProfile
}