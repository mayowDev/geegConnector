import axios from 'axios';
import {setAlert} from './alert';
import {GET_PROFILE, GET_REPOS, GET_PROFILES, UPDATE_PROFILE, ACCOUNT_DELETED, PROFILE_ERROR, CLEAR_PROFILE} from './types'

export const getProfile = () => async dispatch =>{
    try {
        const res = await axios.get('/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getProfiles = () => async dispatch =>{
    dispatch({type: CLEAR_PROFILE})
    try {
        const res = await axios.get('/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getProfileById = userId => async dispatch =>{
    
    try {
        const res = await axios.get(`/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getGithubRepos = username => async dispatch =>{
    try {
        const res = await axios.get(`/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const createProfile =(formData, history, edit = false)=> async dispatch =>{
    try {
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.post('/profile', formData, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profle Updated': 'Profile Created', 'success'))
        if(!edit){
            history.push('/dashboard')
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(e => dispatch(setAlert(e.msg, 'danger', 3000)));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
        
    }
}

export const addExperience = (formData, history) => async dispatch => {
    try {
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.put('/profile/experience', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience Added', 'success'));
        history.push('/dashboard')
        
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(e => dispatch(setAlert(e.msg, 'danger', 3000)));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.data.statusText, status: err.response.status}
        })
        
    }

}

export const addEducation = (formData, history) => async dispatch => {
    try {
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.put('/profile/education', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education Added', 'success'));
        history.push('/dashboard')
        
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(e => dispatch(setAlert(e.msg, 'danger', 3000)));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.data.statusText, status: err.response.status}
        })
        
    }

}

export const deletExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/profile/experience/${id}`);
        dispatch({
            payload: res.data,
            type: UPDATE_PROFILE
        })
        dispatch(setAlert('Experience Removed', 'danger'))
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.data.statusText, status: err.response.status}
        })
        
    }
}

export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/profile/education/${id}`);
        dispatch({
            payload: res.data,
            type: UPDATE_PROFILE
        })
        dispatch(setAlert('Education Removed', 'danger'))
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.data.statusText, status: err.response.status}
        })
        
    }
}

export const deleteAccount = ()=> async dispatch => {
    if(window.confirm('Are you sure? This can Not be Un-done')){
        try {
            await axios.delete('/profile');
            dispatch({type: CLEAR_PROFILE});
            dispatch({type: ACCOUNT_DELETED});
            dispatch(setAlert('Your Account has been Removed permenantly', 'danger'))
        } catch (err) {
            dispatch({
                type:PROFILE_ERROR,
                payload: {msg: err.response.data.statusText, status: err.response.status}
            })
            
        }
    }
    
}