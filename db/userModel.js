const { User }  = require('../model/index'); 
const mongoose = require('mongoose');

User.statics.createUser = async function (user) {
    return await this.insertOne(user);
}
User.statics.getUsers = async function ( filter){
    return await this.find(filter);
}

module.exports = mongoose.model('user', User);