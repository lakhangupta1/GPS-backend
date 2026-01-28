
const userModel = require("../db/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
// const ObjectId = mongoose.ObjectId;


exports.registerUser = async(req, res) => {
    try{

        console.log(" req.body -> ", req.body );
        const { firstname, lastname, email, password, age, type } = req.body;
        
        // check already exits 
        let user = await userModel.getUsers({ email, type });
        console.log(" user -> ", user );
        if(user && user.length){
            return res.status(200).json({
                error : false,
                message : "User already exists",
            })
        }
        // create user
        let hashPass  = bcrypt.hashSync(password, 10);
        user = userModel({
            firstname, lastname, email, password  : hashPass, age, type
        })  
        const result = await user.save();
        return res.status(200).json({
            error : false,
            message : "successfully creat user",
            payload : result
        })

    }catch(error){

        return res.status(501).json({
            error : true,
            message : "failed" + error.message,
            payload : []
        })

    }
}

exports.loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(email && password){
            let user = await userModel.getUsers({ email });
            // console.log(" user login data -> ", user );
            if(user && user.length == 1 ){
                let hashedPass = user[0].password;
                if(bcrypt.compareSync(password, hashedPass)){
                    let token = jwt.sign({user : user[0]}, "lakhan_123@", { expiresIn: '1h' });
                    return res.status(200).json({
                        error : false,
                        message : "login successfull",
                        token,
                        payload : []
                    })
                }else{
                    return res.status(401).json({
                        error : true,
                        message : "Incorrect password",
                        payload : []
                    })
                }
            }
        }else{
            return res.status(400).json({
                error : true,
                message : "failed",
                payload : []
            })
        } 
        
    }catch(error){
        console.log(" error login -> ", error);
        return res.status(500).json({
            error : true,
            message : "failed" + error.message,
            payload : []
        })
    }
}

exports.createUsers = async(req, res ) => {
    try{
        // console.log(" req.body -> ", req.body );
        console.log(" req.image -> ", req.image );
        let user = userModel({ ...req.body, userImage : req?.image?.url });
        let result = await user.save();


        return res.status(401).json({
            error: false,
            message: "success",
            result
        });

    }catch(error){
        return res.status(401).json({
            error: true,
            message: "error" + error.message
        });
    }
} 

exports.getUser = async (req, res) => {
    try {
        console.log("user -> ", req.user );
        if (!req.user?._id) {
            return res.status(401).json({
                error: true,
                message: "Unauthorized"
            });
        }

        const user = await userModel.findById(req.user._id).lean();

        if (!user) {
            return res.status(404).json({
                error: true,
                message: "User not found",
                payload : []
            });
        }

        return res.status(200).json({
            error: false,
            message: "User fetched successfully",
            payload: [user]
        });

    } catch (err) {

        console.error("getUser:", err);
        return res.status(500).json({
            error: true,
            message: "Server error",
            payload : []
        });
    }
};

exports.updateUser = async(req, res ) => {
    try{
        const { _id } = req.user;


    }catch(error){
        console.error("getUser:", error);
        return res.status(500).json({
            error: true,
            message: "Server error",
            payload : []
        });
    }
}
