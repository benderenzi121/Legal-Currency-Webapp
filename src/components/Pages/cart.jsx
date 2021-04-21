import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getCart } from "../../actions/cart";
import { createPayment } from "../../actions/payment";
import PropTypes from "prop-types";
import CartList from "../cart/cartList.jsx";

import Header from "../layout/header.jsx";
import { loadUser } from "../../actions/auth";

const Cart = ({ cart: { cart }, getCart, loadUser, createPayment }) => {
    useEffect(() => {
        async function loadUserAndCart() {
            await loadUser();
            await getCart();
        }

        loadUserAndCart();
    }, [getCart]);

    return (
        <Fragment>
            <div className="container-fluid">
                <Header />

                <div className="cart">
                    <table className="cart__table">
                        <CartList cart={cart} />
                    </table>
                    <button onClick={async () => createPayment()}> Checkout with Paypal </button>
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
