import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const checkAdmin = (permission) => {
    if (permission == "admin")
    {
        return true;
    }
    else return false;
    
}
const AdminRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, permission },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
        (!isAuthenticated &&  !loading && (permission !=='admin')) ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminRoute);
