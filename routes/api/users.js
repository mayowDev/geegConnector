const express = require('express');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router();

const User = require('../../models/User')



/**
 * @route POST api/users
 * @desc Create User
 * @access Private
 */

router.post('/', 
    [   
        // express-validator
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please use a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more character').isLength({ min: 5 })
    ], 
    async (req, res) => {
        const {name, email, password} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
    try{
        
        let user = await User.findOne({email})
        // see if user exits
        if(user){
           return res.status(400).json({errors: [{msg: 'User already exists'}]})
        }
        // get users gravatar
        const avatar = gravatar.url(email, {
            s:'200',
            d:'mm',
            r:'pg'
        })
        user = new User({
            name,
            email,
            password,
            avatar
        })
        // encrypt password before saving user
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)
        await user.save()

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