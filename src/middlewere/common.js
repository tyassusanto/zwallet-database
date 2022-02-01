const joi = require('joi')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')

const myConsole = (req, res, next)=>{ 
    console.log('middlewere');
    next()
}

// middlewere validation update users
const validationUserUpdate = (req, res, next) => {
    const {name, phone} = req.body
    const schema = joi.object({
        name : joi.string().max(128).required(),
        phone : joi.string().max(16).regex(/[0-9]/)
    })
    const {error} = schema.validate(req.body)
    if(error){
        const errorMessage = error.details[0].message.toString()
        return next(createError(422, errorMessage))
    }
    next()
}



module.exports = {
    myConsole,
    validationUserUpdate,
    // emailTokenVerification
}