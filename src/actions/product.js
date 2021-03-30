import axios from 'axios';
import { setAlert } from './alert'


import {
    GET_PRODUCTS,
    PRODUCTS_FAIL
} from './types';


//gets all products in database
export const getProducts = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/products/');
        dispatch({
            type:GET_PRODUCTS,
            payload:res.data,
            loading:false
        });
    } catch(err){
        
        dispatch({
            type: PRODUCTS_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status},
            loading:false
        })
    }
}
