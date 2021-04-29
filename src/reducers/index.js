import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import product from "./product";
import cart from "./cart";
import order from "./order";
export default combineReducers({
    alert,
    auth,
    product,
    cart,
    order,
});
