import axios from "axios";

import { GET_ORDERS_SUCCESS, GET_ORDERS_FAIL, GET_ORDER_SUCCESS, GET_ORDER_FAIL } from "./types";

export const getOrders = () => async (dispatch) => {
    try {
        const res = await axios.get("http://localhost:5000/api/order/get-orders");
        dispatch({
            type: GET_ORDERS_SUCCESS,
            payload: res.data,
            loading: false,
        });
    } catch (err) {
        dispatch({
            type: GET_ORDERS_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status },
            loading: false,
        });
    }
};

export const getOrder = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/order/${id}`);
        dispatch({
            type: GET_ORDER_SUCCESS,
            payload: res.data,
            loading: false,
        });
    } catch (err) {
        dispatch({
            type: GET_ORDER_FAIL,
            payload: { msg: err.msg, status: err.response.status },
            loading: false,
        });
    }
};
