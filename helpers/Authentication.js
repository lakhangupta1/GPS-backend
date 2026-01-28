
const jwt = require('jsonwebtoken');

exports.authorization = async(req, res, next ) => {
    try{
        // console.log(" req.headers['Authorization'] -> ", req.headers['Authorization']) ;
        const token = req.headers.authorization?.split(" ")[1] || req.query.token || req.body.token;

        let decoded = jwt.verify(token,"lakhan_123@");
        req.user = decoded.user;
        // console.log(" req.user -> ", req.user );
        next();
    }catch(error){
        return res.status(501).json({
            error : true,
            message : " error in authrization " + error.message,
            payload : []
        })
    }
}