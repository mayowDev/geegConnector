import {
    REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR,
    LOGIN_SUCCESS, LOGIN_FAIL
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading:true,
    user:null
}
export default function(state = initialState, action){
// export default function(state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case USER_LOADED:
            return {
                ...state,
                user:payload,
                loading:false,
                isAuthenticated:true
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                loading:false,
                isAuthenticated:true
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                loading:false,
                isAuthenticated:false
            }
        default:
            return state;
    }
}