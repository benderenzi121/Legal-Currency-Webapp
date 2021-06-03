import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import axios from "axios";

const ListProduct = ({ products, loading }) => {
    if (loading) {
        return <h2>loading...</h2>;
    }
    return (
        <ul className="list-group mb-4">
            <div className="row">
                {products.map((product) => (
                    <div key={product._id} className="col-lg-4">
                        <li className="product-list__item ">
                            <img className="product-list__item__img" src={product.imagePath} alt="" />
                            <h3 className="product-list__item__title">{product.title}</h3>
                            <p>{product.description}</p>
                            <p>$ {product.price.toFixed(2)}</p>
                            <p>qty: {product.inStock}</p>
                            <div className="row">
                                {product.tag.map((tag) => (
                                    <div key={tag} className="col-lg-4">
                                        <p className="product-list__item__tag">{tag}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="product-list__item__footer">
                                <Link to={`/products/${product._id}`}>
                                    <button className="product-list__item__cart-button"> View Product </button>
                                </Link>
                            </div>
                        </li>
                    </div>
                ))}
            </div>
        </ul>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(ListProduct);
