import React,{useEffect, Fragment} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {getPost} from '../../actions/post'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'


const Post = ({ post:{post, loading}, match, getPost}) => {
    useEffect(()=>{
        getPost(match.params.id)
    }, [getPost])
    return loading  || post === null ? <Spinner/>: <Fragment>
        <Link to='/posts' className='btn'>Back To Posts</Link>
        <PostItem post={post} showActions={false}/>
        <CommentForm postId={post._id}/>
        <div className="comments">
            {post.comments.map(comment => (
                <CommentItem comment={comment} postId={post._id} key={comment._id}/>
            ))}
        </div>

    </Fragment>
        
    
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,

}
const mapStateToProps = state=>({
    post: state.post
})
export default connect(mapStateToProps,{getPost}) (Post)
