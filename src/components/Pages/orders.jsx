import React from "react";
import Header from "../layout/header.jsx";

import OrderList from "../orders/OrderList.jsx";
const Orders = () => {
    return (
        <div className="container-fluid">
            <Header />
            <div className="cart">
                <table className="cart__table">
                    <OrderList />
                </table>
            </div>
        </div>
    );
};

export default Orders;
