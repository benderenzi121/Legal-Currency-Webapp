import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import amazinglogo from "../../static/img/amazinglogo.png";
import { connect } from "react-redux";
const login = (
    <Link to="/login" className="header__link">
        Login
    </Link>
);

const LogoNav = ({ auth: { isAuthenticated, loading, user }, logout }) => (
    <div className="row header">
        <div className="col">
            <div className="row">
                <div className="col-lg-1 header__item">
                    <img src={amazinglogo} className="nav__logo"></img>
                </div>
                <div className="col-lg header__item">
                    <Link to="/products">
                        <h1 className="header__title">LegalCurrency</h1>
                    </Link>
                </div>
            </div>
        </div>
        <div className="col-lg header__login">{!loading && <Fragment>{isAuthenticated ? <i className="fas fa-user"></i> : login}</Fragment>}</div>
    </div>
);
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, null)(LogoNav);
