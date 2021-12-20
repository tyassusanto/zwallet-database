// ini controller users beneran buat tugas
const connection = require('../config/connection')
const modelUsers = require('../models/users')
// register / create
const insertUser = async (req, res, next)=>{
    const {name, username, email, phone} = req.body
    const insertDataUsers = {
        name,
        username,
        email,
        phone
    }
    try {
        const result  = await modelUsers.insertUsers(insertDataUsers)
        res.status(200)
        res.json({
            status : 'Success',
            code : 200,
            data : result,
            message : "Success Insert Data"
        })
    } catch (error) {
        res.status(500),
        next({
            status : 500,
            message : 'Internal Server Error'
        })
    }
}

// get all users data 
// const getAllUsers = async (req, res, next) => {
//     try {
//         const result = await modelUsers.getAllUsers()
//         res.status(200)
//         res.json({
//             status : 'Success',
//             code : 200,
//             data : result,
//             message : "Success Get All Data"
//         })
//     } catch (error) {
//         res.status(500),
//         next({
//             status : 500,
//             message : 'Internal Server Error'
//         })
//     }
// }

// const getAllUsers  = async (req, res, next) => {
//     try {
//         const result = await modelUsers.getAllUsers()
//         res.json({
//             result
//         })
//     } catch (error) {
//         res.status(500),
//         res.json({
//             statusCode : 500,
//             message : "Internal Server Error"
//         })
//     }
// }

// find all users 
const findAllUsers  = async (req, res, next) => {
    try {
        const search = req.query.name
        const sort = req.query.sort
        const order = req.query.order || 'desc'
        // console.log(search, sort, order);
        const result = await modelUsers.findAllUsers({
            search,
            sort,
            order
        })
        res.status(200)
        res.json({
            status : 'Success',
            code : 200,
            data : result,
            message : "Success Get All Data"
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
    res.json({
        status : 'Success',
        code : 200,
        data : result,
        message : `Success Update Data ${id}`
    })
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
        res.json({
            status : 'Success',
            code : 200,
            data : result,
            message : `Success Delete Data ${id}`
        })
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
const getName = async (req, res, next) => {
    try {
        const name = req.params.name
        const [result] = await modelUsers.detailUsers(name)
        res.json({
            message : `Get Users Name : ${name}`,
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
    insertUser,
    findAllUsers,
    // getAllUsers,
    updateUsers,
    deleteUsers,
    detailUsers,
    getName
}