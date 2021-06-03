import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Fragment } from "react";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { removeFromCart, getCart } from "../../actions/cart";

import axios from "axios";

const CartList = ({ cart, removeFromCart, getCart, isAuthenticated }) => {
    useEffect(() => {
        getCart();
    }, [getCart]);
    const checkQuantity = (productId, value, maxQuantity) => {
        if (value > maxQuantity) {
            document.getElementById(productId).getElementsByTagName("input")[0].value = maxQuantity;
        } else if (value < 1) {
            document.getElementById(productId).getElementsByTagName("input")[0].value = 1;
        }
    };
    const addToCart = async (productId, quantity, isAuthenticated, size) => {
        const body = JSON.stringify({ productId, quantity, size });
        const config = {
            headers: {
                "content-type": "application/json",
            },
        };
        try {
            if (isAuthenticated) {
                const res = await axios.post("http://localhost:5000/api/cart/add-to-cart", body, config);
                setAlert("Added to cart", "success");
                await getCart();
            } else {
                console.log("not logged in");
                setAlert("Please Login", "danger");
            }
        } catch (err) {
            console.log(err);
            setAlert("Please Login", "danger");
        }
    };

    return (
        <Fragment>
            <tbody>
                <tr>
                    <th>Title</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Item Total</th>
                    <th>Quantity</th>
                </tr>

                {cart !== null ? (
                    cart.map((item) => (
                        <tr className="cart__table__item" key={item.product._id + item.size}>
                            <td>
                                <div className="col">
                                    <img className="cart__table__item__img" src={item.product.imagePath} />
                                </div>
                                <div className="col">
                                    <p className="cart__table__item__title">{item.product.title} </p>
                                </div>
                            </td>
                            <td>{item.size}</td>

                            <td>
                                <p>{item.product.price.toFixed(2)}</p>
                            </td>
                            <td>
                                <p>{item.total.toFixed(2)}</p>
                            </td>
                            <td>
                                <div className="row">
                                    <button
                                        className="cart__table__item__button"
                                        onClick={async () => removeFromCart(item.product._id.toString(), 1, item.size)}
                                    >
                                        <i className="fas fa-minus"></i>
                                    </button>

                                    <div className="col">
                                        <p>{item.qty}</p>
                                    </div>

                                    <button
                                        className="cart__table__item__button cart__table__item__button-right "
                                        onClick={async () => addToCart(item.product._id.toString(), 1, isAuthenticated, item.size)}
                                    >
                                        <i className="fas fa-plus "></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td>
                            <p>loading...</p>
                        </td>
                    </tr>
                )}
            </tbody>
        </Fragment>
    );
};
CartList.propTypes = {
    removeFromCart: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    cart: state.cart.cart,
    isAuthenticated: state.auth,
});
export default connect(mapStateToProps, { removeFromCart, getCart })(CartList);
