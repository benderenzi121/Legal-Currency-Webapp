import axios from "axios";
import { setAlert } from "./alert";

import {
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL,
    GET_PRODUCTS,
    PRODUCTS_FAIL,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
} from "./types";

//gets all products in database even out of stock and hidden items
export const getProductsAdmin = () => async (dispatch) => {
    try {
        const res = await axios.get("http://localhost:5000/api/products/");
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data,
            loading: false,
        });
    } catch (err) {
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data,
            loading: false,
        });
    }
};

//gets a single product from its ID
export const getProduct = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        dispatch({
            type: GET_PRODUCT_SUCCESS,
            payload: res.data,
            loading: false,
        });
    } catch (err) {
        dispatch({
            type: GET_PRODUCT_FAIL,
            payload: err.data,
            loading: false,
        });
    }
};

//gets products based on the tags passed in (none currently)
export const getProducts = () => async (dispatch) => {
    try {
        const res = await axios.get("http://localhost:5000/api/products/product-list");
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data,
            loading: false,
        });
    } catch (err) {
        dispatch({
            type: PRODUCTS_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status },
            loading: false,
        });
    }
};

//Adds a product to the database
export const createProduct = ({ title, description, price, tags, imagePath, inStock, pricePaid }) => async (dispatch) => {
    let tag = [];
    tag.push(tags);
    const config = {
        headers: {
            "content-type": "application/json",
        },
    };

    const body = {
        title,
        description,
        price,
        tag,
        imagePath,
        inStock,
        pricePaid,
    };

    try {
        const res = await axios.post("http://localhost:5000/api/products/new-product", body, config);
        dispatch(setAlert("Product added to database", "success"));
        dispatch({
            type: ADD_PRODUCT_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: ADD_PRODUCT_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//Updates value of product in the database

export const updateProductQuantity = ({ id, change }) => async (dispatch) => {
    const config = {
        headers: {
            "content-type": "application/json",
        },
    };

    const body = { id, change };

    try {
        const res = await axios.put("http://localhost:5000/api/products/update-stock", body, config);
        dispatch(setAlert("Product quantity updated", "success"));
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

export const updateProductData = ({ id, imagePath, price }) => async (dispatch) => {
    console.log("irun");
    const config = {
        headers: {
            "content-type": "application/json",
        },
    };

    const body = { id, price, imagePath };

    try {
        const res = await axios.put("http://localhost:5000/api/products/update-product", body, config);
        dispatch(setAlert("Product data was updated", "success"));
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//toggle featured product

export const toggleFeatured = ({ id }) => async (dispatch) => {
    const config = {
        headers: {
            "content-type": "application/json",
        },
    };

    const body = { id };

    try {
        console.log(id);
        const res = await axios.put("http://localhost:5000/api/products/featured-toggle", body, config);
        dispatch(setAlert("Product featured toggle", "success"));
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//add a tag to a product

export const addTag = ({ id, tag }) => async (dispatch) => {
    const config = {
        headers: {
            "content-type": "application/json",
        },
    };

    const body = { id, tag };

    try {
        const res = await axios.put("http://localhost:5000/api/products/add-tag", body, config);
        dispatch(setAlert("tag added", "success"));
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//remove a tag from a product
export const removeTag = ({ id, tag }) => async (dispatch) => {
    const config = {
        headers: {
            "content-type": "application/json",
        },
    };

    const body = { id, tag };

    try {
        const res = await axios.put("http://localhost:5000/api/products/remove-tag", body, config);
        dispatch(setAlert("tag added", "success"));
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};
