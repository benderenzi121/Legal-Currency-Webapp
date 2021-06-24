import React, { useEffect, useState } from "react";
import { Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProductsAdmin } from "../../actions/product";
import Pagination from "../pagination/pagination";
import { Fragment } from "react";

const AdminProducts = ({ getProductsAdmin, products }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);

    useEffect(() => {
        getProductsAdmin();
    }, [getProductsAdmin]);

    // get current Products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    //change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Fragment>
            <div className="cart">
                <table className="cart__table">
                    <tbody>
                        <tr>
                            <th>Title</th>

                            <th>Price</th>
                            <th>Details</th>
                        </tr>
                        {currentProducts.map((product) => (
                            <tr className="cart__table__item" key={product._id}>
                                <td>
                                    <div className="col">
                                        <img className="cart__table__item__img" src={product.imagePath} />
                                    </div>
                                    <div className="col">
                                        <p className="cart__table__item__title">{product.title} </p>
                                    </div>
                                </td>

                                <td>
                                    <p>{product.price.toFixed(2)}</p>
                                </td>
                                <td>
                                    <Link to={`/admin/products/${product._id}`}>
                                        <button>Details</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate} />
            </div>
        </Fragment>
    );
};

AdminProducts.propTypes = {
    getProductsAdmin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    products: state.product.products,
});

export default connect(mapStateToProps, { getProductsAdmin })(AdminProducts);
