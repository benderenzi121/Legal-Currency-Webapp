import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOrders } from "../../actions/order";
import { ListItemAvatar } from "@material-ui/core";
const OrderList = ({ order: { orders, loading }, getOrders }) => {
    useEffect(() => {
        getOrders();
    }, [getOrders]);
    return (
        <Fragment>
            <tbody>
                <tr>
                    <th>Order #</th>
                    <th>Placed on</th>
                    <th>Total</th>
                    <th>Details</th>
                </tr>
                {loading ? (
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
                                    <button>Details</button>
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
};
const mapStateToProps = (state) => ({
    order: state.order,
});
export default connect(mapStateToProps, { getOrders })(OrderList);
