import store from "../../store";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { useEffect, useState, Fragment } from "react";
import { getProducts } from "../../actions/product";

import LogoNav from "../layout/logoNav.jsx";
import Nav from "../layout/nav.jsx";

import ListProduct from "../products/listProduct.jsx";
import Pagination from "../pagination/pagination";
import Filters from "../products/Filters.jsx";
import Alert from "../layout/alert";

const Products = ({ products: { products, loading }, getProducts }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(3);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    // get current Products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    //change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Fragment>
            <div className="container-fluid">
                <LogoNav />
                <Nav />
                <Alert />

                <div className="product-list">
                    <h1 className="product-list__title"> products </h1>
                    <ListProduct products={currentProducts} loading={loading} />
                    <Pagination productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate} />
                </div>
            </div>
        </Fragment>
    );
};

Products.propTypes = {
    getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    products: state.product,
});

export default connect(mapStateToProps, { getProducts })(Products);
