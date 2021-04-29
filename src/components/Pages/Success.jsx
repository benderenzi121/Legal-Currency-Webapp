import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { executePayment } from "../../actions/payment";
import { loadUser } from "../../actions/auth";
import { payment } from "paypal-rest-sdk";
import Header from "../layout/header.jsx";
import axios from "axios";
const Success = ({ executePayment, loadUser }) => {
    const getParams = () => {
        const queryParamsString = window.location.search.substr(1);

        const queryParams = queryParamsString.split("&").reduce((accumulator, singleQueryParam) => {
            const [key, value] = singleQueryParam.split("=");
            accumulator[key] = value;
            return accumulator;
        }, {});

        return queryParams;
    };
    useEffect(() => {
        loadUser();
        let params = getParams();
        console.log(params);
        const PayerID = params.PayerID;
        const paymentId = params.paymentId;
        executePayment({ paymentId, PayerID });
    }, [loadUser, executePayment]);

    return (
        <div className="container-fluid">
            <Header />
            <h1> Success!!!</h1>
        </div>
    );
};

Success.PropTypes = {
    executePayment: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
};

export default connect(null, { executePayment, loadUser })(Success);
