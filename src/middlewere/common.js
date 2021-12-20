const myConsole = (req, res, next)=>{ 
    console.log('middlewere');
    next()
}

const errorHandling = (err, req, res, next) => {
    const statusCode = err.status
    const errMessage = err.message
    res.status = statusCode
    res.json({
        errorMessage : errMessage
    })
}
module.exports = {
    myConsole,
    errorHandling
}