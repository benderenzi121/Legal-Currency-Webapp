import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProduct, addTag, removeTag } from "../../actions/product";

const ProductTags = ({ product: { product, loading }, match, getProduct, addTag, removeTag }) => {
    useEffect(() => {
        getProduct(match.params.id);
    }, [getProduct, match.params.id]);

    const [formData, setFormData] = useState({
        tag: "",
    });
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const { tag } = formData;

    const onSubmit = async (e) => {
        e.preventDefault();
        const id = product._id;
        addTag({ id, tag });
    };
    const onRemoveTag = async ({ tag }) => {
        const id = product._id;
        removeTag({ id, tag });
    };
    return (
        <div className="adminTags">
            {loading ? (
                <p>loading...</p>
            ) : (
                <div className="adminTags__content">
                    <div className="container">
                        <img className="adminTags__image" src={product.imagePath}></img>
                        <h1 className="adminTags__title">Tags for {product.title}</h1>
                        <div className="row">
                            {product.tag.map((tag) => (
                                <div key={tag} className="col-6 ">
                                    <div className="row">
                                        <p key={tag} className="product-list__item__tag ">
                                            {tag}
                                            <button onClick={async () => onRemoveTag({ tag })} className="btn">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <form className="form" onSubmit={onSubmit}>
                            <div className="form-group">
                                <div className="row">
                                    <div className="adminTags__form">
                                        <input
                                            className="adminProduct__input__form"
                                            type="text"
                                            placeholder="new tag"
                                            name="tag"
                                            value={tag}
                                            onChange={onChange}
                                            required
                                        />

                                        <input type="submit" className="btn btn-primary" value="Add" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
Product.propTypes = {
    getProduct: PropTypes.func.isRequired,
    addtag: PropTypes.func.isRequired,
    removeTag: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    product: state.product,
});
export default connect(mapStateToProps, { getProduct, addTag, removeTag })(ProductTags);
