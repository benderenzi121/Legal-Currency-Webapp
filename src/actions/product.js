import axios from 'axios';
import { setAlert } from './alert'


import {
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL,
    GET_PRODUCTS,
    PRODUCTS_FAIL
} from './types';


//gets all products in database
export const getProducts = () => async dispatch => {


    try {
        const res = await axios.get('http://localhost:5000/api/products/product-list');
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

//Adds a product to the database
export const createProduct = ({title, description, price, tags, imagePath, inStock, pricePaid}) => async dispatch => {
    let tag = [];
    tag.push(tags);
    const config={
        headers: {
            'content-type' : 'application/json'
        }
      }
    
    const body = {title, description, price, tag, imagePath, inStock, pricePaid};
    
    try{
        
        const res = await axios.post('http://localhost:5000/api/products/new-product',body,config);
        dispatch(setAlert('Product added to database', 'success'));
        dispatch({
            type:ADD_PRODUCT_SUCCESS,
            payload: res.data
        })
    }catch(err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: ADD_PRODUCT_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status},
        })
    }
}
