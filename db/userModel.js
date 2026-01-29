const mongoose = require('mongoose');
const UserSchema = require('../model/userSchema');

UserSchema.statics.createUser = async function (user) {
    return await this.create(user);
}
UserSchema.statics.getUsers = async function (filter) {
    return await this.find(filter);
}

module.exports = mongoose.model('User', UserSchema);