import axios from 'axios';
import {
    CART_ADD_SUCCESS,
    CART_ADD_FAIL,
    CART_REMOVE_SUCCESS,
    CART_REMOVE_FAIL
} from './types';

export const addToCart = (id,qty) => async dispatch => {
    const body = JSON.stringify({id,qty});
    const config={
        headers: {
            'content-type' : 'application/json'
        }
      }
    try{
        console.log(iran);
        const res = await axios.post('http://localhost:5000/api/cart/add-to-cart', body, config);
        dispatch({
            type:CART_ADD_SUCCESS,
            payload:res.data,
            loading:false
        });
    }catch(err){
        
        dispatch({
            type: CART_ADD_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status},
            loading:false
        })
    }
}



