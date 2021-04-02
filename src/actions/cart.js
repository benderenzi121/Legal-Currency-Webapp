import axios from 'axios';
import {
    GET_CART_SUCCESS,
    GET_CART_FAIL
} from './types';

import React from 'react'

export const getCart = () => async dispatch => {
    try{
        const res = await axios.get('http://localhost:5000/api/cart/get-cart');
        dispatch({
            type: GET_CART_SUCCESS,
            payload:res.data,
            loading:false
        })
    }
    catch(err){
        
        dispatch({
            type: GET_CART_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status},
            loading:false
        })
    }
}



