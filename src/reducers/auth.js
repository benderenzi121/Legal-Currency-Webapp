
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,LOGIN_FAIL,
    LOGOUT,
    PERMISSIONS_FAIL,
    PERMISSIONS_SUCCESS
} from '../actions/types';


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    permission:null
}


export default function(state = initialState, action) {
   const {type, payload} = action
    switch(type){
        case USER_LOADED:
            return {
              ...state,
              isAuthenticated: true,
              loading: false,
              user: payload
            };
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
          localStorage.setItem('token', payload.token);
          console.log('yurr');
          return {
              ...state,
              ...payload,
              isAuthenticated: true,
              loading:false
            
          };
    
      case PERMISSIONS_SUCCESS:
          return{
              ...state,
              permission:payload
          };
          
      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case AUTH_ERROR:
      case PERMISSIONS_FAIL:
      case LOGOUT:
          localStorage.removeItem('token');
          return {
            ...state,
            token:null,
            isAuthenticated: false,
            loading:false
        };
      default:
          return state;
    }
}