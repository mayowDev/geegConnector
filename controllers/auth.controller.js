const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const passport = require('passport')
const validateLoginInput = require('../validation/login')
const User = require('../models/User')
const gravatar = require('gravatar');

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
        // console.log('passport err', info)
        if(err) throw err
        if(!user) res.status(400).json({errors: [{msg: 'Invalid credntials'}]})
        else{
            req.logIn(user, error => {
                if(error) throw error;
                // console.log('loged in successfully', user)
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
            })
        }

    })(req, res, next)
    
}

const signInWithGoogle = (req, res, next) =>{
    passport.authenticate('google',{ 
        scope: ['profile'],
        // successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/auth/google', // redirect back to the signup page if there is an error
        // failureFlash : true // allow flash messages
    })(req, res, next); 
}
const loginWithGoogle = (req, res, next) =>{
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next); 
}
const redirectWithGoogle = (req, res, next)=>{
    passport.authenticate("google", (err, user, info) => {
        if(err) throw err
        if(!user) res.status(400).json({msg: 'Invalid credntials'})
        else{
            req.logIn(user, error => {
                if(error) throw error;
                // console.log('loged in successfully', req.user)
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
                        // res.status(200).json({token, msg: 'you reached the google redirect callback', data: user})
                        // res.redirect("http://localhost:3000?token=" + token);
                        // req.body.googleToken = token
                        res.json({token})                        
                    }
                )
            })
        }
    })(req, res, next)
}

const handleGoogleRedirect =  (req, res, next)=>{
    passport.authenticate('google', {session: true})(req, res, next)
    // function(req, res, next){
    //     // console.log('req.user', req.user)
    //     res.redirect('http://localhost:3000/dashboard');
    //     // console.log('req.user', req.user)
    // }
     //exchange your google code with profile information


        //passport attches user to req method so we can access req.user
    // console.log('req.user', req.user)
    // res.send({msg: 'you reached the google redirect callback', data: 'test'})
    // console.log('req.user', req.user)

    // res.redirect('/profile')
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
    passport.authenticate('facebook')(req, res, next);
    // res.send('you reached the facebook redirect callback url')
    res.send(req.user)

}

/**
 * @route GET /auth
 * @desc test route
 * @access Public
 */
 const getMe = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password')
        // res.send(req.user)
        res.json(user)
    }catch(err){
        console.error(err.message)
        res.status(500).send('server error')
    }
}

const logout = async (req, res)=>{
    // req.session = null;
    req.logout();
    // res.redirect('/')
}


module.exports ={
    getMe,
    signUp,
    login,
    logout,
    signInWithGoogle,
    loginWithGoogle,
    redirectWithGoogle,
    signInWithFacebook,
    handleGoogleRedirect,
    handleFacebookRedirect
}