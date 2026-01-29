
const userModel = require("../db/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
// const ObjectId = mongoose.ObjectId;


exports.registerUser = async(req, res) => {
    try{

        console.log(" req.body -> ", req.body );
        const { firstname, lastname, email, password, age, type } = req.body;
        // image (if uploaded via multipart + cloud upload middleware)
        const userImage = req?.image?.url || null;
        
        // check already exists by email
        let user = await userModel.getUsers({ email });
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
            firstname,
            lastname,
            email,
            password: hashPass,
            age,
            type,
            userImage
        });
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
        
        console.log(" req.body -> ", req.body );
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
        const { password } = req.body;
        const userImage = req?.image?.url || null;
        const hashed = password ? bcrypt.hashSync(password, 10) : undefined;
        let user = userModel({ ...req.body, password: hashed, userImage });
        let result = await user.save();

        return res.status(200).json({
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
        // console.log("user -> ", req.user );
        // if (!req.user?._id) {
        //     return res.status(401).json({
        //         error: true,
        //         message: "Unauthorized"
        //     });
        // }

        // const user = await userModel.findById(req.user._id).lean();
        const user  = await userModel.getUsers({  });
        console.log(" fetched user -> ", user );
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

exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id || req.params._id;
        console.log(" req.params.id -> ", id );

        const user = await userModel.findById(id).lean();
        console.log(" fetched user -> ", user );
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
