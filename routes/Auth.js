var express = require('express');
var router = express.Router();
const userController = require('../controllers/User');
const upload = require('../helpers/multer');
const uploadToCloud = require('../helpers/upload');

/* create users */
// accept multipart/form-data for registration (optional userImage)
router.post(
	'/register',
	upload.single('userImage'),
	(req, res, next) => {
		if (req.file) {
			return uploadToCloud('profile_photos')(req, res, next);
		}
		next();
	},
	userController.registerUser
);
router.post('/login', userController.loginUser);

module.exports = router;
