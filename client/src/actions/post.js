import axios from 'axios'
import {GET_POSTS, POST_ERROR, UPDATE_LIKES} from './types'
import {setAlert} from './alert'
export const getPosts = ()=> async dispatch =>{
    try {
        const res = await axios.get('/api/posts')
        dispatch({
            payload:res.data,
            type:GET_POSTS
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload: {msg: err.response.data.statusText, status: err.response.status}
        })
        
    }
}
// add like
export const addLike = id => async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/like/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id, likes: res.data}
            
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload: {msg: err.response.data.statusText, status: err.response.status}
        })
        
    }
}
// rmeove like
export const removeLike = id => async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id, likes: res.data}
            
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload: {msg: err.response.data.statusText, status: err.response.status}
        })
        
    }
}