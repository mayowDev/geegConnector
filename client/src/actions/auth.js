import axios from 'axios';
import {setAlert} from './alert'
import setAuthToken from '../utils/setAuthToken'
import {
    REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR,
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE
} from './types';

// Load current signed in user
export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/auth/me');
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

export const register = ({ name, email, password}) => async dispatch => {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }
    const body = JSON.stringify({ name, email, password });
     try {
         const res = await axios.post('/auth/signup', body, config)
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

export const login = ( email, password ) => async dispatch => {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }
    const body = JSON.stringify({ email, password });
     try {
         const res = await axios.post('/auth/login', body, config)
         console.log('loged in successfully',res)
         dispatch({
             type: LOGIN_SUCCESS,
             payload: res.data
         });
         dispatch(loadUser());
     } catch(err) {
        const errors = err.response.data.errors;
        console.log('sign in err', errors);
        if(errors){
            errors.forEach(e => dispatch(setAlert(e.msg, 'danger', 3000)));
        }
        dispatch({
            type: LOGIN_FAIL
        })
     }
}


export const loginWithGoogle = ()=> async dispatch => {
    const config = {
        headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://accounts.google.com/'},
        withCredentials: true
    }
    // const body = JSON.stringify({ email });
     try {
        const res = await axios.get('http://localhost:5000/auth/google')
        console.log('google res', res)
         dispatch({
             type: LOGIN_SUCCESS,
             payload: res.data
         });
         dispatch(loadUser());
     } catch(err) {
        console.log('google sign in err', err);
        // const errors = err.response.data.errors;
        // if(errors){
        //     errors.forEach(e => dispatch(setAlert(e.msg, 'danger', 3000)));
        // }
        dispatch({
            type: LOGIN_FAIL
        })
     }
}


export const fetchUserAction = ()=>{
    return (dispatch)=>{
     axios.get('/auth/me')
     .then((res)=>{
        dispatch({type:USER_LOADED,payload:res.data})
     })
 
    }
 }

export const logout = () => dispatch =>{
    dispatch({type: CLEAR_PROFILE})
    dispatch({type: LOGOUT})
}