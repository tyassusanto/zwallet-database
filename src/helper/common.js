const notFound = (req, res, next) => {
    res.status(404)
    res.json({
        message : "URL NOT FOUND"
    })
}

const errorHandling = (err, req, res, next) => {
    const statusCode = err.status
    // console.log(err.status);
    const errMessage = err.message
    res.status(statusCode)
    res.json({
        errorMessage : errMessage
    })
}

const response = (res, result, status, message, pagination) => {
    res.json({
        status : 'Success',
        code : status || 200,
        data : result,
        message : message || null,
        pagination
    })
}

module.exports = {
    notFound,
    errorHandling,
    response
}