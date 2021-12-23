const myConsole = (req, res, next)=>{ 
    console.log('middlewere');
    next()
}
module.exports = {
    myConsole
}