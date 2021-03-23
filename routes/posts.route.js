const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const postController = require('../controllers/posts.controller')

router.get('/', auth, postController.getAllPosts);
router.get('/:id', auth, postController.getPostById);
router.post('/', auth, postController.createPost);
router.put('/like/:id', auth, postController.likePost);
router.put('/unlike/:id', auth, postController.unlikePost);
router.delete('/:id', auth, postController.deletePost);
router.post('/comment/:id', auth, postController.createComment)
router.delete('/comment/:id/:comment_id', auth, postController.deleteComment)

module.exports = router;