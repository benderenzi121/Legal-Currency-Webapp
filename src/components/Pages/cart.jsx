import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { getCart } from "../../actions/cart";
import { createPayment } from "../../actions/payment";
import PropTypes from "prop-types";
import CartList from "../cart/cartList.jsx";
import Alert from "../layout/alert";
import { setAlert } from "../../actions/alert";

import Header from "../layout/header.jsx";
import { loadUser } from "../../actions/auth";

const Cart = ({ cart: { cart }, getCart, loadUser, createPayment }) => {
    const [shipping, setShipping] = useState(5);

    useEffect(() => {
        async function loadUserAndCart() {
            await loadUser();
            await getCart();
        }

        loadUserAndCart();
    }, [getCart, loadUser]);
    const handleChange = (event) => {
        setShipping(Number(event.target.value));
    };
    return (
        <Fragment>
            <div className="container-fluid">
                <Header />
                <Alert />
                <div className="cart">
                    <table className="cart__table">
                        <CartList cart={cart} />
                    </table>
                    <select value={shipping} onChange={handleChange}>
                        <option value={5}>Standard Shipping $5.00</option>
                        <option value={10}>Express Shipping $10.00</option>
                    </select>
                    <p></p>
                    <button onClick={async () => createPayment({ shipping })}> Checkout with Paypal </button>
                </div>
            </div>
        </Fragment>
    );
};
Cart.propTypes = {
    getCart: PropTypes.func.isRequired,
    cart: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    createPayment: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    cart: state.cart,
});

export default connect(mapStateToProps, { getCart, loadUser, createPayment })(Cart);
