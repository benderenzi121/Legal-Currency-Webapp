import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Switch } from "react-router-dom";
import { getProduct, updateProductQuantity, updateProductData, toggleFeatured } from "../../actions/product";
import { update } from "../../../backend/models/Product";

const Product = ({ getProduct, updateProductQuantity, toggleFeatured, updateProductData, product: { product, loading }, match }) => {
    useEffect(() => {
        getProduct(match.params.id);
    }, [getProduct, match.params.id]);

    const [formData, setFormData] = useState({
        price: "",
        change: "",
        imagePath: "",
    });
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitQuantity = async (e) => {
        e.preventDefault();

        const id = product._id;
        const change = Number(formData.change);
        updateProductQuantity({ id, change });
    };
    const onSubmitImage = async (e) => {
        e.preventDefault();
        const id = product._id;
        updateProductData({ id, imagePath });
    };
    const onSubmitFeatured = async (e) => {
        const id = product._id;
        toggleFeatured({ id });
    };

    const onSubmitPrice = async (e) => {
        e.preventDefault();
        const id = product._id;
        updateProductData({ id, price });
    };

    const { title, description, price, imagePath, change, pricePaid } = formData;
    return (
        <div className="adminProduct">
            {loading || product == null ? (
                <p>loading</p>
            ) : (
                <Fragment>
                    <div className="row">
                        <div className="col-3">
                            <img className="adminProduct__img" src={product.imagePath} />
                            <form className="form" onSubmit={onSubmitImage}>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="adminProduct__input">
                                            <input
                                                className="adminProduct__input__form"
                                                type="url"
                                                placeholder="New image path"
                                                name="imagePath"
                                                value={imagePath}
                                                onChange={onChange}
                                                required
                                            />
                                            <input type="submit" className="btn btn-primary adminProduct__input__submit" value="Update" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col">
                            <p className="adminProduct__title">{product.title}</p>

                            <div className="adminProduct__subtext">
                                <p>{product.description}</p>

                                <div className="row">
                                    <div className="adminProduct__input">
                                        <p>Qty: {product.inStock}</p>
                                        <form className="form" onSubmit={onSubmitQuantity}>
                                            <div className="form-group">
                                                <div className="col">
                                                    <div className="row">
                                                        <input
                                                            className="adminProduct__input__form"
                                                            type="number"
                                                            placeholder="Add to stock (#)"
                                                            name="change"
                                                            value={change}
                                                            onChange={onChange}
                                                            required
                                                        />
                                                        <input
                                                            type="submit"
                                                            className="adminProduct__input__submit btn btn-primary "
                                                            value="Update"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="row">
                                    {product.tag.map((tag) => (
                                        <div key={tag} className="col-4 ">
                                            <p key={tag} className="product-list__item__tag adminProduct__tags">
                                                {tag}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <Link to={`/admin/products/${product._id}/tags`}>
                                    <button className="btn btn-primary">Edit tags</button>
                                </Link>
                                {/* <div className="row">
                                    <div className="adminProduct__input">
                                        <div className="adminProduct__input-featured">
                                            <div className="row">
                                                <p className="adminProduct__featured__text">
                                                    Featured: {product.featured == null ? <p>loading...</p> : product.featured.toString()}
                                                </p>
                                                <button onClick={async () => onSubmitFeatured()} className="btn btn-primary">
                                                    Featured toggle
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        <div className="col">
                            <div className="row">
                                <div className="adminProduct__rightCol">
                                    <p className="adminProduct__price">${product.price}</p>

                                    <form className="form" onSubmit={onSubmitPrice}>
                                        <div className="form-group">
                                            <div className="row">
                                                <input
                                                    className="adminProduct__input__form"
                                                    type="number"
                                                    placeholder="New Price (#)"
                                                    name="price"
                                                    value={price}
                                                    onChange={onChange}
                                                    required
                                                />

                                                <input type="submit" className="btn btn-primary " value="Update" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    );
};

Product.propTypes = {
    getProduct: PropTypes.func.isRequired,
    updateProductQuantity: PropTypes.func.isRequired,
    updateProductData: PropTypes.func.isRequired,
    toggleFeatured: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    product: state.product,
});

export default connect(mapStateToProps, { getProduct, updateProductQuantity, updateProductData, toggleFeatured })(Product);
