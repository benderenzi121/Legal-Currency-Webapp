import { connect } from "react-redux";
import React, { useEffect } from "react";
import { BrowserRouter as Router, RouteSwitch, Route, Link } from "react-router-dom";
import AdminRoute from "../routing/AdminRoute";
import PropTypes from "prop-types";
import Header from "../layout/header.jsx";
import Alert from "../layout/alert";
import Pagination from "../pagination/pagination";
import { loadPermissions, loadUser } from "../../actions/auth";
import { Fragment, useState } from "react";

import AdminProducts from "../admin/adminProducts.jsx";
import CreateProduct from "../admin/createProduct.jsx";
import Product from "../admin/product";
import ProductTags from "../admin/productTags.jsx";

const Admin = ({ permission, loadPermissions }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);

    useEffect(() => {
        loadPermissions();
    }, [loadPermissions]);

    const adminRoute = (
        <div className="container-fluid">
            <Router>
                <div className="row">
                    <div className="col-2">
                        <h1>Sidebar Nav</h1>
                        <ul>
                            <Link to="/admin/create-product">
                                <li>add a product</li>
                            </Link>
                            <Link to="/admin/products">
                                <li>view/ updateproducts</li>{" "}
                            </Link>
                        </ul>
                    </div>
                    <div className="col">
                        <AdminRoute path="/admin/create-product" exact component={CreateProduct} />
                        <AdminRoute path="/admin/products" exact component={AdminProducts} />
                        <AdminRoute path="/admin/products/:id" exact component={Product} />
                        <AdminRoute path="/admin/products/:id/tags" exact component={ProductTags} />
                    </div>
                </div>
            </Router>
        </div>
    );

    return (
        <div className="container-fluid">
            <Header />
            <Alert />
            {permission == "admin" ? adminRoute : <h1>notadmin</h1>}
        </div>
    );
};

Admin.propTypes = {
    loadPermissions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    permission: state.auth.permission,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loadPermissions, loadUser })(Admin);
