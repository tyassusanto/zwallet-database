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
        res.json({
            message : "Insert User Behasil",
            result
        })
    } catch (error) {
        res.status(500),
        res.json({
            statusCode : 500,
            message : "Internal Server Error"
        })
    }
}

// get all users 
const getAllUsers  = async (req, res, next) => {
    try {
        const result = await modelUsers.getAllUsers()
        res.json({
            result
        })
    } catch (error) {
        res.status(500),
        res.json({
            statusCode : 500,
            message : "Internal Server Error"
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
    res.json({
        message : "Berhasil Update",
        result
    })
    } catch (error) {
        res.status(500),
        res.json({
            statusCode : 500,
            message : "Internal Server Error"
        })
    }
    
}

// delete
const deleteUsers = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await modelUsers.deleteUsers(id)
        res.json({
            result
        })
    } catch (error) {
        res.status(500),
        res.json({
            statusCode : 500,
            message : "Internal Server Error"
        })
    }
}

// JOIN DENGAN TABLE WALLET
// const detailUsers = async (req, res, next) => {
//     try {
//         const id = req.params.id
//         const [result] = await modelUsers.detailUsers(id)
//         res.json({
//             message : `Detail Users id : ${id}`,
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
const detailUserss = async (req, res, next) => {
    try {
        const name = req.params.name
        const result = await modelUsers.detailUserss(name)
        if(!result){
            res.json({
                message: 'kosong'
            })
        }else{
            res.json({
                result
            })
        }
        // const name =  req.params.name
        // if(!name){
        //     res.json({
        //         message : "kosong"
        //     })
        // }else{
        //     const result = await modelUsers.detailUserss(name)
        //     res.json({
        //         message : `Nama : ${name}`,
        //         result
        //     })
        // }
    } catch (error) {
        res.status(500),
        res.json({
            statusCode : 500,
            message : "Internal Server Error"
        })
    }
}


module.exports = {
    insertUser,
    getAllUsers,
    updateUsers,
    deleteUsers,
    // detailUsers,
    detailUserss
}