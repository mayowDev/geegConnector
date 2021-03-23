import axios from 'axios'
import {GET_POSTS, GET_POST, POST_ERROR, ADD_COMMENT, REMOVE_COMMENT,
    UPDATE_LIKES, DELETE_POST, ADD_POST} from './types'
import {setAlert} from './alert'

// get all posts
export const getPosts = ()=> async dispatch =>{
    try {
        const res = await axios.get('/posts')
        dispatch({
            payload:res.data,
            type:GET_POSTS
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
        
    }
}

// get single post
export const getPost = id => async dispatch =>{
    try {
        const res = await axios.get(`/posts/${id}`)
        dispatch({
            payload:res.data,
            type:GET_POST
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
        
    }
}

// add like
export const addLike = id => async dispatch =>{
    try {
        const res = await axios.put(`/posts/like/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id, likes: res.data}
            
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
        
    }
}

// remove like
export const removeLike = id => async dispatch =>{
    try {
        const res = await axios.put(`/posts/unlike/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id, likes: res.data}
            
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
        
    }
}

// add post
export const addPost= formData => async dispatch =>{
    const config ={
        headers:{
            'Conten-Type': 'application/json'
        }
    }
    try {
        
        const res = await axios.post(`/posts`, formData, config)
        dispatch({
            type:ADD_POST,
            payload: res.data
            
        })
        dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })        
        
    }
}

// delete post
export const deletePost= id => async dispatch =>{
    try {
        await axios.delete(`/posts/${id}`)
        dispatch({
            type:DELETE_POST,
            payload:id
            
        })
        dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
        
        
        
    }
}

// add comment
export const addComment= (postId, formData) => async dispatch =>{
    const config ={
        headers:{
            'Conten-Type': 'application/json'
        }
    }
    try {
        
        const res = await axios.post(`/posts/comment/${postId}`, formData, config)
        dispatch({
            type:ADD_COMMENT,
            payload: res.data
            
        })
        dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })        
        
    }
}

// delete comment
export const deleteComment= (postId, commentId) => async dispatch =>{
    
    try {
        
        await axios.delete(`/posts/comment/${postId}/${commentId}`)
        dispatch({
            type:REMOVE_COMMENT,
            payload: commentId
            
        })
        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })        
        
    }
}