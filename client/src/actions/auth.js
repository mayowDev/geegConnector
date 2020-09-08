import axios from 'axios';
import {setAlert} from './alert'
import setAuthToken from '../utils/setAuthToken'
import {
    REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR,
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT
} from './types';

// Load user
export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:AUTH_ERROR
        })
    }
} 

// register user
export const register = ({ name, email, password}) => async dispatch => {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password });
     try {
         const res = await axios.post('/api/users', body, config)
         dispatch({
             type: REGISTER_SUCCESS,
             payload: res.data
         });
         dispatch(loadUser());
     } catch(err) {
        const errors = err.response.data.errors;
        console.log(errors)
        if(errors){
            errors.forEach(e => dispatch(setAlert(e.msg, 'danger', 3000)));
        }
        dispatch({
            type: REGISTER_FAIL
        })
     }
}

// login user
export const login = ( email, password ) => async dispatch => {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password });
     try {
         const res = await axios.post('/api/auth', body, config)
         dispatch({
             type: LOGIN_SUCCESS,
             payload: res.data
         });
         dispatch(loadUser());
     } catch(err) {
        const errors = err.response.data.errors;
        console.log(errors)
        if(errors){
            errors.forEach(e => dispatch(setAlert(e.msg, 'danger', 3000)));
        }
        dispatch({
            type: LOGIN_FAIL
        })
     }
}

// LOGOUT / Clear user profile
export const logout = () => dispatch =>{
    dispatch({type: LOGOUT})
}