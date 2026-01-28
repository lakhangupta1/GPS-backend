const Mongoose = require("mongoose");


const userSchema = Mongoose.Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    email : {
        type : String,
    },
    password:{
        type:String,
    },
    age:{
        type:Number,
    },
    type : {
        type : String,
        enum : ['Software Engineer', 'Sales', 'HR', 'Operation Team', 'Python Team' ] 
    },
    userImage : {
        type : String
    }
},{
  timestamps: true
})



module.exports = userSchema;
