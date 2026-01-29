
const jwt = require('jsonwebtoken');

exports.authorization = async(req, res, next ) => {
    try{
        // console.log(" req.headers['Authorization'] -> ", req.headers['Authorization']) ;
        const token = req.headers.authorization?.split(" ")[1] || req.query.token || req.body.token;

        if (!token) {
            return res.status(401).json({ error: true, message: "No token provided", payload: [] });
        }

        let decoded = jwt.verify(token, "lakhan_123@");
        req.user = decoded.user;
        // console.log(" req.user -> ", req.user );
        next();
    }catch(error){
        return res.status(401).json({
            error : true,
            message : " error in authorization " + error.message,
            payload : []
        })
    }
}