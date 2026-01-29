var express = require('express');
var router = express.Router();
const userController = require('../controllers/User');
const authentication = require('../helpers/Authentication');
const upload = require('../helpers/multer');
const  uploadToCloud  = require('../helpers/upload'); 

/* create users */
// router.use(authentication.authorization);
router.post('/create', upload.single("photo"), uploadToCloud("profile_photos"), userController.createUsers);
router.get('/getuser', userController.getUser);
router.get('/getuser/:_id', userController.getUserById);

module.exports = router;
