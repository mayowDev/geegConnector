const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const validate = require('../middleware/validation')
const authController = require('../controllers/auth.controller')
const passport = require('passport')
const validateLoginInput = require('../validation/login')
const User = require('../models/User')

router.get('/', auth, authController.testRoute)
router.post('/signup', authController.signUp)
router.post('/login', authController.login)

router.get('/', authController.signInWithGoogle)
router.get('/', authController.handleGoogleRedirect)
router.post('/', authController.signInWithGoogle)


//deletAccount
//resetPassword
//forgotpassword
// updateprofiledata
//update current logid in users password
module.exports = router;