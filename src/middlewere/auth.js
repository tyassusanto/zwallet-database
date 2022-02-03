const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const verifToken = (req, res, next) => {
    // const token = req.headers.authorization
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
        // console.log(token);
    } else {
        return next(createError(403, 'Need Token'))
    }
    try {
        const secretKey = process.env.SECRET_KEY_JWT
        const decoded = jwt.verify(token, secretKey);
        req.email = decoded.email
        req.role = decoded.role
        // console.log('decode', decoded);
      } catch(err) {
        return next(createError(403, 'Invalid Token'))
        // console.log('err', err);
      }
      next()
}

// const isAdmin = (req, res, next) => {
//     const role = req.role
//     if (role !== 'admin') {
//         return next(createError(401, 'Access Denied'))
//     } else{
//         next()
//     }
// }
const isAdmin = (req, res, next) => {
    const role = req.role;
    if (role === 'admin') {
      next();
    } else {
      return next(createError(403, 'Access Denied!'))
    }
  };

module.exports = {
    verifToken,
    isAdmin
}