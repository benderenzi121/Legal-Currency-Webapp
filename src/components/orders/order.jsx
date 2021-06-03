import React, { Fragment, useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOrder } from "../../actions/order";

import Header from "../layout/header.jsx";

const Order = ({ match, getOrder, order, loading }) => {
    useEffect(() => {
        async function Order() {
            await getOrder(match.params.id);
        }
        Order();
    }, [getOrder, match.params.id]);
    let subTotal = 0;
    console.log(order.shippingPrice);

    return (
        <Fragment>
            <div className="container-fluid">
                <Header />
                {loading ? (
                    <p>loading...</p>
                ) : (
                    <div className="cart">
                        <table className="cart__table">
                            <tbody>
                                <tr>
                                    <th>Title</th>
                                    <th>Size</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>

                                {order.orderItems == null ? (
                                    <p>loading..</p>
                                ) : (
                                    order.orderItems.map((item) => (
                                        <tr className="cart__table__item" key={item.product._id}>
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
                                                <p>{item.qty}</p>
                                            </td>
                                            <td>
                                                <p>{item.product.price.toFixed(2)}</p>
                                            </td>
                                            <td>
                                                <p>{item.total.toFixed(2)}</p>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        <div className="order__details">
                            {order.shippingPrice !== null && order.total !== null ? (
                                <Fragment>
                                    <p>Shipping price: $ {Number(order.shippingPrice).toFixed(2)}</p>
                                    <p>Total: $ {Number(order.total).toFixed(2)}</p>
                                </Fragment>
                            ) : (
                                <p>loading...</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    );
};
Order.propTypes = {
    getOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    order: state.order.order,
    loading: state.order.loading,
});
export default connect(mapStateToProps, { getOrder })(Order);
