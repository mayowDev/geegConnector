const express = require('express')
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const router = express.Router()


/**
 * @route GET api/profile/me
 * @desc Get current user profile
 * @access Private
 */

router.get('/me', auth, async (req, res) => {
    
    try{ 
        const profile = await Profile.findOne({user: req.user.id})
        .populate('user', ['name', 'avatar']);
        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'})
        }
        res.json(profile)
    }catch(err){
        res.status(500).send('server error')
        console.error(err.message)
    }
    
})


/**
 * @route POST api/profile
 * @desc create or update a new user profile
 * @access Private
 */

 router.post('/', 
    auth,
    [   
        // express-validator
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()
    ], 
    async (req, res) => {
        // check body errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {
            company,
            website,
            location,
            bio,
            status,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
            githubusername
        } = req.body
        // Get fields from body - build profile object
        const profileFields = {};
        profileFields.user = req.user.id;

        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername)
        profileFields.githubusername = githubusername;
        // Spilt Skills into array
        if (skills) {
        profileFields.skills = skills.split(',').map(skill =>skill.trim());
        }

        // build Social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;
        // create or update profile
        try{
            let profile = await Profile.findOne({ user: req.user.id })
            if (profile) {
                // Update
              profile = await Profile.findOneAndUpdate(
                  { user: req.user.id },
                  { $set: profileFields },
                  { new: true }
                );
                return res.json(profile);
            }
            // create
            profile = new Profile(profileFields);
            await profile.save()
            res.json(profile);

        }catch(err){
            console.error(err.message)
            res.status(400).send('server error')
        }
        
    }
 )

module.exports = router;