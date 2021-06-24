import axios from "axios";
import { CREATE_PAYMENT_FAIL, CREATE_PAYMENT_SUCCESS } from "./types";
import { setAlert } from "./alert";
const util = require("util");

const getPaypalUrl = (token) => `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=${token}`;

export const createPayment =
    ({ shipping }) =>
    async (dispatch) => {
        const body = { shipping };
        console.log(body);
        try {
            const res = await axios.post("http://localhost:5000/paypal/pay", body);
            console.log(res.data);

            const token = res.data.token;
            const paypalUrl = getPaypalUrl(token);
            window.location.assign(paypalUrl);
        } catch (err) {
            const msg = err.response.data.error;
            dispatch(setAlert(`${msg}`, "danger"));
            dispatch({
                type: CREATE_PAYMENT_FAIL,
                payload: { msg: err.response.data.error, status: err.response.status },
                loading: false,
            });
        }
    };

export const executePayment =
    ({ paymentId, PayerID }) =>
    async (dispatch) => {
        try {
            const body = { paymentId, PayerID };

            const res = await axios.post("http://localhost:5000/paypal/success", body);
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };
