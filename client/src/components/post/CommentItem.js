import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import {deleteComment} from '../../actions/post'

const CommentItem = props => {
    const { deleteComment, postId, auth, comment:{user, name, avatar, _id, text, date }}= props
    return (
        <Fragment>
        <div class="comments">
            <div class="post bg-white p-1 my-1">
                <div>
                <Link to={`/profile/${user}`}>
                    <img
                    class="round-img"
                    src={avatar}
                    alt=""
                    />
                    <h4>{name}</h4>
                </Link>
                </div>
                <div>
                    <p class="my-1">
                        {text}
                    </p>
                        <p class="post-date">
                        Posted on:  <Moment format='DD/MM/YYYY'>{date}</Moment>
                    </p>
                    {!auth.loading && user === auth.user._id &&(
                        <button 
                        className='btn btn-danger' 
                        type='button' 
                        onClick={e=> deleteComment(postId, _id)}
                        >
                            <i className="fa fa-trash"/>
                        </button>
                    )}
                </div>
            </div>
        </div>
    </Fragment>

    )
    
}

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    postId:PropTypes.number.isRequired,
    deleteComment:PropTypes.func.isRequired,


}
const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteComment}) (CommentItem)
