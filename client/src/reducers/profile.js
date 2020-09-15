import {GET_PROFILE, GET_PROFILES, GET_REPOS,
    UPDATE_PROFILE, PROFILE_ERROR, CLEAR_PROFILE} 
    from '../actions/types'
const initialState = {
    profile:null,
    profiles: [],
    repos: [],
    loading: true,
    errors:{}
};
export default function(state= initialState, action){
    const {type, payload } = action;
    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state, 
                profile: payload,
                loading: false
            }; 
        case GET_PROFILES:
            return {
                ...state, 
                profiles: payload,
                loading: false
            };
        case PROFILE_ERROR:
            return{
                ...state,
                errors: payload,
                loading:false
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                profile: null,
                loading:false,
                repos:[]
            }
        case GET_REPOS:
            return{
                ...state,
                repos:payload,
                loading:false
            }
        default:
           return state;
    }
}