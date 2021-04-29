import { GET_ORDERS_FAIL, GET_ORDERS_SUCCESS, GET_ORDER_FAIL, GET_ORDER_SUCCESS } from "../actions/types";

const initialState = {
    orders: [],
    order: [],
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                orders: payload,
                loading: false,
            };
        case GET_ORDERS_FAIL:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                order: payload,
                loading: false,
            };
        case GET_ORDER_FAIL:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state;
    }
}
