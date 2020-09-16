import axios from 'axios'
import {GET_POSTS, POST_ERRO, POST_ERROR} from './types'
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