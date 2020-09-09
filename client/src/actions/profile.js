import axios from 'axios';
import {setAlert} from './alert';
import {GET_PROFILE, PROFILE_ERROR} from './types'

// get current profile

export const getProfile = () => async dispatch =>{
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.data.statusText, status: err.response.status}
        })
    }
}