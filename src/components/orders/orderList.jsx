import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOrders, getOrder } from "../../actions/order";
import { loadUser } from "../../actions/auth";
import { ListItemAvatar } from "@material-ui/core";
const OrderList = ({ order: { orders, loading }, getOrders, getOrder, loadUser }) => {
    useEffect(() => {
        loadUser();
        getOrders();
    }, [getOrders, loadUser]);
    return (
        <Fragment>
            <tbody>
                <tr>
                    <th>Order #</th>
                    <th>Placed on</th>
                    <th>Total</th>
                    <th>Details</th>
                </tr>
                {orders == null ? (
                    <tr>
                        <td>loading</td>
                        <td>loading</td>
                        <td>loading</td>
                        <td>loading</td>
                    </tr>
                ) : (
                    orders.map((item) => (
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.placedOn}</td>
                            <td>{item.total}</td>
                            <td>
                                <Link to={`/orders/${item._id}`}>
                                    <button onClick={async () => getOrder(item._id)}>Details</button>
                                </Link>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </Fragment>
    );
};
OrderList.propTypes = {
    getOrders: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    getOrder: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    order: state.order,
});
export default connect(mapStateToProps, { getOrders, loadUser, getOrder })(OrderList);
