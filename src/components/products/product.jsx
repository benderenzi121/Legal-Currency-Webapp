import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../layout/header.jsx";
import { setAlert } from "../../actions/alert";
import { getProduct } from "../../actions/product";
import Alert from "../layout/alert";
import axios from "axios";

const Product = ({ getProduct, product: { product, loading }, isAuthenticated, match, setAlert }) => {
    useEffect(() => {
        getProduct(match.params.id);
    }, [getProduct, match.params.id]);

    const [size, setSize] = useState("medium");
    const handleChange = (event) => {
        setSize(event.target.value);
    };

    const addToCart = async (productId, quantity, isAuthenticated, size) => {
        const body = JSON.stringify({ productId, quantity, size });
        const config = {
            headers: {
                "content-type": "application/json",
            },
        };
        try {
            if (isAuthenticated) {
                const res = await axios.post("http://localhost:5000/api/cart/add-to-cart", body, config);
                setAlert("Added to cart", "success");
            } else {
                console.log("not logged in");
                setAlert("Please Login", "danger");
            }
        } catch (err) {
            console.log(err);
            setAlert("Please Login", "danger");
        }
    };

    const checkQuantity = (productId, value, maxQuantity) => {
        if (value > maxQuantity) {
            document.getElementById(productId).value = maxQuantity;
        } else if (value < 1) {
            document.getElementById(productId).value = 1;
        }
    };

    return (
        <div className="container-fluid">
            <Header />
            <Alert />
            {loading || product == null ? (
                <p>loading</p>
            ) : (
                <div className="adminProduct">
                    <div className="row">
                        <div className="col-lg-4">
                            <img className="adminProduct__img" src={product.imagePath} />
                        </div>

                        <div className="col-lg">
                            <p className="adminProduct__title">{product.title}</p>

                            <div className="adminProduct__subtext">
                                <p>{product.description}</p>

                                <div className="row">
                                    <div className="adminProduct__input">
                                        <p>Qty: {product.inStock}</p>
                                    </div>
                                </div>

                                <div className="row">
                                    {product.tag.map((tag) => (
                                        <div key={tag} className="col-lg-4 ">
                                            <p key={tag} className="product-list__item__tag adminProduct__tags">
                                                {tag}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <p>Size: </p>
                                <select value={size} onChange={handleChange}>
                                    <option value={"small"}>Small</option>
                                    <option value={"medium"}>Medium</option>
                                    <option value={"large"}>Large</option>
                                    <option value={"x large"}>x Large</option>
                                    <option value={"xx large"}>xx Large</option>
                                    <option value={"xxx large"}>xxx Large (+$4.00 at checkout)</option>
                                </select>
                                <div className="product-list__item__footer product__footer">
                                    <input
                                        id={`quantity-selector__${product._id}`}
                                        type="number"
                                        defaultValue={1}
                                        onChange={(e) => checkQuantity(`quantity-selector__${product._id}`, e.target.value, product.inStock)}
                                    />
                                    <button
                                        onClick={async () =>
                                            addToCart(
                                                product._id,
                                                Number(document.getElementById(`quantity-selector__${product._id}`).value),
                                                isAuthenticated,
                                                size,
                                            )
                                        }
                                        className="product-list__item__cart-button"
                                    >
                                        {" "}
                                        Add to Cart{" "}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg">
                            <div className="row">
                                <div className="adminProduct__rightCol">
                                    <p className="adminProduct__price">${product.price.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

Product.propTypes = {
    getProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    product: state.product,
    isAuthenticated: state.auth,
});

export default connect(mapStateToProps, { getProduct, setAlert })(Product);
