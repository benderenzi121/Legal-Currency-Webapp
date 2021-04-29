import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../actions/alert";
import axios from "axios";

const ListProduct = ({ products, loading, isAuthenticated, setAlert }) => {
    if (loading) {
        return <h2>loading...</h2>;
    }

    const addToCart = async (productId, quantity, isAuthenticated) => {
        const body = JSON.stringify({ productId, quantity });
        const config = {
            headers: {
                "content-type": "application/json",
            },
        };
        try {
            if (isAuthenticated) {
                const res = await axios.post("http://localhost:5000/api/cart/add-to-cart", body, config);
                setAlert("success", "success");
            } else {
                console.log("not logged in");
                setAlert("Please Login", "danger");
            }
        } catch (err) {
            console.log(err);
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
        <ul className="list-group mb-4">
            <div className="row">
                {products.map((product) => (
                    <Fragment>
                        <div className="col-lg-4">
                            <li key={product._id} className="product-list__item ">
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
                                            )
                                        }
                                        className="product-list__item__cart-button"
                                    >
                                        {" "}
                                        Add to Cart{" "}
                                    </button>
                                </div>
                            </li>
                        </div>
                    </Fragment>
                ))}
            </div>
        </ul>
    );
};

ListProduct.propTypes = {
    setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(ListProduct);
