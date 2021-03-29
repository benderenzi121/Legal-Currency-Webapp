import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import amazinglogo from "../static/img/amazinglogo.png";
import { connect } from "react-redux";
const login = (
  <Link to="/login" className="header__link">
    Login
  </Link>
);
const profile = (
  <Link to="/login" className="header__link">
    Profile
  </Link>
);
const LogoNav = ({ auth: { isAuthenticated, loading, user }, logout }) => (
  <div className="row header">
    <div className="col">
      <div className="row">
        <div className="col-1 header__item">
          <img src={amazinglogo} className="nav__logo"></img>
        </div>
        <div className="col header__item">
          <h1 className="header__title">Amazing Games TCG</h1>
        </div>
      </div>
    </div>
    <div className="col header__login">
      {!loading && (
        <Fragment>
          {isAuthenticated ? (
            <Link to="/login" className="header__link">
              {user.firstName}
            </Link>
          ) : (
            login
          )}
        </Fragment>
      )}
    </div>
  </div>
);
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(LogoNav);
