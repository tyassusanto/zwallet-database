const notFound = (req, res, next) => {
    res.status(404)
    res.json({
        message : "URL NOT FOUND"
    })
}

module.exports = {
    notFound
}