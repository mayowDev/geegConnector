const express = require('express')
const router = express.Router()

const { check, validationResult } = require('express-validator');
const config = require('config')
const auth = require('../../middleware/auth')
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


/**
 * @route POST api/posts
 * @desc Create post
 * @access Private
 */

router.post('/', auth, 
    [
        check('text', 'Tex is required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        try {
            const user = await User.findById(req.user.id).select('-password');
            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            })
            const post = await newPost.save();
            res.json(post);
        } catch (err) {
            console.error(err);
            res.status(500).send('server error')
            
        }
        
    
})

/**
 * @route GET api/posts
 * @desc Get all post
 * @access Private
 */

 router.get('/', auth, async (req, res)=>{
    try {
        const posts = await Post.find().sort({date: -1})    
        res.json(posts)
    } catch (err) {
        console.error(err.message);
        
        res.status(500).send('server error')
        
    } 
    
 })

 
/**
 * @route GET api/posts/:id
 * @desc Get  post by id
 * @access Private
 */

router.get('/:id', auth, async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({msg: 'Post not found'})
        }
        res.json(post)
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Post not found'})
        }
        res.status(500).send('server error')
        
    } 
    
 })

 
/**
 * @route DELETE api/posts/:id
 * @desc DELETE post by id
 * @access Private
 */

router.delete('/:id', auth, async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({msg: 'Post not found'})
        }
        // check user ownership
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authorized'}) 
        }
        // else remove the post
        await post.remove()
        
        res.json({msg:'Post removed'})
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Post not found'})
        }
        res.status(500).send('server error')
        
    } 
    
 })

 
/**
 * @route PUT api/posts/:id
 * @desc Like post by id
 * @access Private
 */

router.put('/like/:id', auth, async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        // check post if already liked
        if(post.likes.filter(like => like.user.toString()
         === req.user.id).length > 0){
             return res.status(400).json({msg: 'Post already liked'})
         }
        //add the like
         post.likes.unshift({user: req.user.id});
         await post.save();
         res.json(post.likes)
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Post not found'})
        }
        res.status(500).send('server error')

        
    }
})


/**
 * @route PUT api/posts/:id
 * @desc Unlike post by id
 * @access Private
 */

router.put('/unlike/:id', auth, async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        // check post if already liked
        if(post.likes.filter(like => like.user.toString()
         === req.user.id).length === 0){
             return res.status(400).json({msg: 'There is no likes for this Post'})
         }
        //remove like
         const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
         post.likes.splice(removeIndex, 1)
         await post.save();
         res.json(post.likes)
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Post not found'})
        }
        res.status(500).send('server error')

        
    }
})


/**
 * @route POST api/posts/comment/:id
 * @desc Create Comment on post
 * @access Private
 */

router.post('/comment/:id', auth, 
    [
        check('text', 'Tex is required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        try {
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id);
            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            }
            // add comment to the end of the comments array
            post.comments.unshift(newComment)
            await post.save();
            res.json(post.comments);
        } catch (err) {
            console.error(err);
            res.status(500).send('server error')
            
        }  
})


/**
 * @route DELETE api/posts/comment/:id/comment_id
 * @desc Delete Comment on post
 * @access Private
 */

// router.post('/comment/:id', auth, 
router.delete('/comment/:id/:comment_id', auth, async (req, res)=>{
    try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(com => com.id === req.params.comment_id);
    // make sure comment exist
    if(!comment){
        return res.status(404).json({mgs: 'Comment not found'})
    }
    // check comment owner 
    if(comment.user.toString() !== req.user.id){
        return res.status(401).json({msg: 'User not authorized'})
    }
    // remove comment
    const removeIndex = post.comments.map(com => com.user.toString()).indexOf(req.user.id)
    post.comments.splice(removeIndex, 1)
    await post.save();
    res.json(post.comments)
    
    
    } catch (error) {
    console.error(err);
    res.status(500).send('server error')
    }
})

module.exports = router;