import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import {addLike, deletePost, removeLike} from '../../actions/post'

const PostItem = props => {
    const {auth, addLike, removeLike, deletePost,
      post:{_id, user, avatar, name, comments, likes, text, date }}= props;
    return (
        <Fragment>
            <div class="post bg-white p-1 my-1">
        <div>
          <a href="profile.html">
            <img
              class="round-img"
              src={avatar}
              alt=""
            />
            <h4>{name}</h4>
          </a>
        </div>
        <div>
          <p class="my-1">
            {text}
          </p>
           <p class="post-date">
                Posted on <Moment format='DD/MM/YYY'>{date}</Moment>
          </p>
          <button type="button" class="btn btn-light" onClick={e=> addLike(_id)}>
            <i class="fa fa-thumbs-up"/>{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                
          </button>
          <button type="button" class="btn btn-light" onClick={e=> removeLike(_id)}>
            <i class="fa fa-thumbs-down"></i>
          </button>
          <Link to={`/post/${_id}`} class="btn btn-primary">
            Comments {' '} 
            { comments.length > 0 && ( 
              <span class='comment-count'>{comments.length}</span>
             )} 
          </Link>
          {!auth.loading && user === auth.user._id &&(
              <button      
              type="button"
              class="btn btn-danger"
              onClick={e=> deletePost(_id)}
              >
               <i class="fa fa-times"></i>
            </button>
          )}
        </div>
      </div>
     </Fragment>
    )
}

PostItem.propTypes = {
    posts: PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    removeLike: PropTypes.func.isRequired,
    addLike:PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired

}
const mapStateToProps = state=>({
    auth: state.auth
})

export default connect(mapStateToProps, {addLike, deletePost, removeLike})
(PostItem)
