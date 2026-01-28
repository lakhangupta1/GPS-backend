var express = require('express');
var router = express.Router();
const userController = require('../controllers/User');

/* create users */
router.post('/register', userController.registerUser);
router.get('/login', userController.loginUser);

module.exports = router;
