var express = require('express');
var indexRouter = express.Router();
const UserRouter = require('./Users.js');
const AuthRoter = require('./Auth.js');

/* GET home page. */
indexRouter.use('/auth', AuthRoter);
indexRouter.use('/user', UserRouter);

module.exports = indexRouter;
