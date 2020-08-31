const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const auth = require('../../middleware/auth')
const User = require('../../models/User')



/**
 * @route GET api/auth
 * @desc test route
 * @access Public
 */

router.get('/', auth, async (req, res) => {
    
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }catch(err){
        console.error(err.message)
        res.status(500).send('server error')
    }

})


/**
 * @route POST api/users
 * @desc Login User
 * @access Public
 */

router.post('/', 
    [   
        // express-validator
        check('email', 'Please use a valid email').isEmail(),
        check('password', 'Please enter a password').exists()
    ], 
    async (req, res) => {
        const {email, password} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
    try{
        
        let user = await User.findOne({email})
        // see if user exits
        if(!user){
           return res.status(400).json({errors: [{msg: 'invalid credntials'}]})
        }
        
        // make sure password matchs with bcrypt
        const passMatch = await bcrypt.compare(password, user.password)
        if(!passMatch){
            return res.status(400).json({errors: [{msg: 'invalid credntials'}]})
        }
        // retutn jsonwebtoken
        const paylod= {
            user: {
                id: user.id
            }
        } 
        jwt.sign(
            paylod, 
            config.get('jwtSecret'),
            {expiresIn: 36000},
            (err, token) =>{
                if(err) throw err;
                res.json({token})
            }
        )
    }catch(err){
        console.error(err.message)
        res.status(500).send('server error')
    }
    
})

module.exports = router;