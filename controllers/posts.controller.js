const Post = require('../models/Post');
const User = require('../models/User');

/**
 * @route POST /posts
 * @desc Create post
 * @access Private
 */
const createPost = async (req, res) => {
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
}
/**
 * @route GET /posts
 * @desc Get all post
 * @access Private
 */
const getAllPosts = async (req, res)=>{
    try {
        const posts = await Post.find().sort({date: -1})    
        res.json(posts)
    } catch (err) {
        console.error(err.message);
        
        res.status(500).send('server error')
    } 
}
/**
 * @route GET /posts/:id
 * @desc Get  post by id
 * @access Private
 */
const getPostById = async (req, res)=>{
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
}
/**
 * @route DELETE /posts/:id
 * @desc DELETE post by id
 * @access Private
 */
const deletePost = async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({msg: 'Post not found'})
        }
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authorized'}) 
        }
        await post.remove()
        
        res.json({msg:'Post removed'})
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Post not found'})
        }
        res.status(500).send('server error')  
    }    
}
/**
 * @route PUT /posts/:id
 * @desc Like post by id
 * @access Private
 */
const likePost = async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg: 'Post already liked'})
        }
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
}
/**
 * @route PUT /posts/:id
 * @desc Unlike post by id
 * @access Private
 */
const unlikePost = async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg: 'There is no likes for this Post'})
        }
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
}


/**
 * @route POST /posts/comment/:id
 * @desc Create Comment on post
 * @access Private
 */
const createComment = async (req, res) => {
    //Todo: validate body.text here
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
        post.comments.unshift(newComment)
        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err);
        res.status(500).send('server error')
        
    }  
}
/**
 * @route DELETE /posts/comment/:id/comment_id
 * @desc Delete Comment on post
 * @access Private
 */
const deleteComment = async (req, res)=>{
    try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(com => com.id === req.params.comment_id);
    if(!comment){
        return res.status(404).json({mgs: 'Comment not found'})
    }
    if(comment.user.toString() !== req.user.id){
        return res.status(401).json({msg: 'User not authorized'})
    }
    const removeIndex = post.comments.map(com => com.user.toString()).indexOf(req.user.id)
    post.comments.splice(removeIndex, 1)
    await post.save();
    res.json(post.comments)
    } catch (error) {
    console.error(err);
    res.status(500).send('server error')
    }
}

module.exports ={
    createPost,
    getAllPosts,
    getPostById,
    deletePost,
    likePost,
    unlikePost,
    createComment,
    deleteComment
}