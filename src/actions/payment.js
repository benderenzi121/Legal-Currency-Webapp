import axios from "axios";
import { CREATE_PAYMENT_FAIL, CREATE_PAYMENT_SUCCESS } from "./types";

export const createPayment = () => async (dispatch) => {
    try {
        const res = await axios.post("http://localhost:5000/paypal/pay");
        dispatch({
            type: CREATE_PAYMENT_SUCCESS,
            payload: res.data,
            loading: false,
        });
    } catch (err) {
        dispatch({
            type: CREATE_PAYMENT_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status },
            loading: false,
        });
    }
};
