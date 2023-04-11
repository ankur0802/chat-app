const Errorhandler = require("../utils/errorhandler")

const notfound = (req, res, next)=>{
    return next(new Errorhandler(`Not found - ${req.originalUrl}`), 404)
}

module.exports = notfound;