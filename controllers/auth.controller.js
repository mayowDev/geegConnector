const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const passport = require('passport')
const validateLoginInput = require('../validation/login')
const User = require('../models/User')
const gravatar = require('gravatar');

/**
 * @route GET /auth
 * @desc test route
 * @access Public
 */
const testRoute = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }catch(err){
        console.error(err.message)
        res.status(500).send('server error')
    }
}

// const validate = [   
//     // express-validator
//     check('name', 'Name is required').not().isEmpty(),
//     check('email', 'Please use a valid email').isEmail(),
//     check('password', 'Please enter a password with 6 or more character').isLength({ min: 5 })
// ]

const signUp = async (req, res, next) => {
    await validateLoginInput(req.body)
    const {name, email, password} = req.body;
    try{
        User.findOne({email}, async(err, user)=>{
            if(err) throw err
            if(user){
                return res.status(400).json({errors: [{msg: 'User already exists'}]})
            }  
            if(!user){

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
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt)

                await user.save()
                res.send({msg: 'user created'})
                
            }      
        })
    

        //Todo: retutn jsonwebtoken // need to editthis
        // const paylod= {
        //     user: {
        //         id: user.id
        //     }
        // } 
        // jwt.sign(
        //     paylod, 
        //     config.get('jwtSecret'),
        //     {expiresIn: 36000},
        //     (err, token) =>{
        //         if(err) throw err;
        //         res.json({token})
        //     }
        // )
    }catch(err){
        console.error(err.message)
        res.status(500).send('server error')
    }
}



/**
 * @route POST /auth
 * @desc Login User
 * @access Public
 */
const login = async (req, res, next) => {
    await validateLoginInput(req.body)
    passport.authenticate("local", (err, user, info) => {
        if(err) throw err
        if(!user) res.status(400).json({errors: [{msg: 'Invalid credntials'}]})
        else{
            req.logIn(user, error => {
                if(error) throw error;
                res.send({msg: 'loged in successfully'})
                console.log('req.user', req.user)

            })
        }

    })(req, res, next)
    
    // try{
    //     let user = await User.findOne({email})
    //     if(!user){
    //     return res.status(400).json({errors: [{msg: 'Invalid credntials'}]})
    //     }
    //     const passMatch = await bcrypt.compare(password, user.password)
    //     if(!passMatch){
    //         return res.status(400).json({errors: [{msg: 'Invalid credntials'}]})
    //     }
    //     const paylod= {
    //         user: {
    //             id: user.id
    //         }
    //     } 
    //     jwt.sign(
    //         paylod, 
    //         config.get('jwtSecret'),
    //         {expiresIn: 36000},
    //         (err, token) =>{
    //             if(err) throw err;
    //             res.json({token})
    //         }
    //     )
    // }catch(err){
    //     console.error(err.message)
    //     res.status(500).send('server error')
    // }
}

const signInWithGoogle = (req, res, next) =>{
    passport.authenticate('google',{ 
        scope: ['profile'],
        // successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/auth/google', // redirect back to the signup page if there is an error
        // failureFlash : true // allow flash messages
    })(req, res, next); 
    
}

const handleGoogleRedirect =  (req, res, next)=>{
    passport.authenticate('google')(req, res, next);  //exchange your google code with profile information
        //passport attches user to req method so we can access req.user
        // console.log('req.user', req)
    res.redirect('/profile')
}

const signInWithFacebook=(req, res, next)=>{
    passport.authenticate('facebook',{ 
        scope: ['profile'],
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/auth/facebook', // redirect back to the signup page if there is an error
        // failureFlash : true // allow flash messages
    })(req, res, next); 

}

const handleFacebookRedirect =  (req, res, next)=>{
    passport.authenticate('facebook')(req, res, next);  //exchange your google code with profile information
    // res.send('you reached the facebook redirect callback url')
    res.send(req.user)

}

module.exports ={
    testRoute,
    signUp,
    login,
    signInWithGoogle,
    signInWithFacebook,
    handleGoogleRedirect,
    handleFacebookRedirect
}