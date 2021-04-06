import { GET_CART_SUCCESS,GET_CART_FAIL,REMOVE_CART_SUCCESS,REMOVE_CART_FAIL }
 from "../actions/types";

 const initialState = {
    cart:[],
    loading:true,
    error:{}
  }
export default function(state = initialState, action ) {
    const {type, payload} = action;

    switch(type){
        case REMOVE_CART_SUCCESS:
        case GET_CART_SUCCESS:
            return {
                ...state,
                cart:payload,
                loading:false
            };
        case REMOVE_CART_FAIL:
        case GET_CART_FAIL:
        return {
            ...state,
            error:payload,
            loading:false
        };

        default:
            return state;
    }
}