import { CREATE_PAYMENT_SUCCESS, CREATE_PAYMENT_FAIL } from "../actions/types";

const initialState = {
    loading: true,
    paypal: null,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                paypal: payload,
                loading: false,
            };

        default:
            return state;
    }
}
