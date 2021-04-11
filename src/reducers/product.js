import { ADD_PRODUCT_FAIL, ADD_PRODUCT_SUCCESS, GET_PRODUCTS, PRODUCTS_FAIL } from "../actions/types";

const initialState = {
    products:[],
    loading:true,
    error:{}

}

export default function(state = initialState, action ) {
    const {type, payload } = action;

    switch(type){
        case ADD_PRODUCT_SUCCESS:
        case GET_PRODUCTS:
            return {
                ...state, 
                products:payload,
                loading:false
            };
        case ADD_PRODUCT_FAIL:
        case PRODUCTS_FAIL:{
            return {
                ...state,
                error:payload,
                loading:false
            };
        }
        default:
            return state;
    }
}
