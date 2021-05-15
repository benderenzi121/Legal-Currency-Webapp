import axios from "axios";
import { GET_CART_SUCCESS, GET_CART_FAIL, REMOVE_CART_SUCCESS, REMOVE_CART_FAIL } from "./types";

import React from "react";

export const getCart = () => async (dispatch) => {
    try {
        const res = await axios.get("http://localhost:5000/api/cart/get-cart");
        dispatch({
            type: GET_CART_SUCCESS,
            payload: res.data,
            loading: false,
        });
    } catch (err) {
        dispatch({
            type: GET_CART_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status },
            loading: false,
        });
    }
};

export const removeFromCart = (productId, quantity, size) => async (dispatch) => {
    console.log(productId);
    const config = {
        headers: {
            "content-type": "application/json",
        },
    };

    const body = JSON.stringify({ productId, quantity, size });

    try {
        const res = await axios.post("http://localhost:5000/api/cart/remove-from-cart", body, config);
        dispatch({
            type: REMOVE_CART_SUCCESS,
            payload: res.data,
            loading: false,
        });
    } catch (err) {
        dispatch({
            type: REMOVE_CART_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status },
            loading: false,
        });
    }
};
