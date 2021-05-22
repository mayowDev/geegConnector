const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const validate = require('../middleware/validation')
const authController = require('../controllers/auth.controller')
const passport = require('passport')
const validateLoginInput = require('../validation/login')
const User = require('../models/User')

router.get('/me', auth, authController.getMe)
router.post('/signup', authController.signUp)
router.post('/login', authController.login)
// router.get('/google', authController.signInWithGoogle)
// router.get('/google/redirect', authController.handleGoogleRedirect)
router.get('/google', authController.loginWithGoogle);
router.get('/google/redirect', authController.redirectWithGoogle);


//deletAccount
//resetPassword
//forgotpassword
// updateprofiledata
//update current logid in users password
module.exports = router;