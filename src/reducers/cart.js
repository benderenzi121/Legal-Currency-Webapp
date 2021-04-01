import { CART_ADD_SUCCESS,
     CART_ADD_FAIL,
     CART_REMOVE_SUCCESS,
     CART_REMOVE_FAIL }
 from "../actions/types";

 const initialState = {
     
  }
export default function(state = initialState, action ) {
    const {type, payload} = action;

    switch(type){
        case CART_ADD_SUCCESS:
            return {
                ...state,
                loading:false
            }
        case CART_ADD_FAIL:
            return {
                ...state,
                error:payload,
                loading:false
            }
        default:
            return state;
    }
}