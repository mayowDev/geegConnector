const { check } = require('express-validator');

const resgisterValidation = [   
    // express-validator
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please use a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more character').isLength({ min: 5 })
]

module.exports = {
    resgisterValidation
}