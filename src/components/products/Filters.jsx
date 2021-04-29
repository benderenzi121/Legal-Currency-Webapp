import React, { Fragment } from "react";
import connect from "react-redux";
export const Filters = ({ products }) => {
    return (
        <div className="filters">
            <h3 className="filters__heading">Filters</h3>
            {products.map((product) => (
                <Fragment>
                    <div className="col-sm" key={product._id}>
                        {product.tag.map((tag) => (
                            <p className="filters__tag " key={tag}>
                                {tag}
                            </p>
                        ))}
                    </div>
                </Fragment>
            ))}
        </div>
    );
};

export default Filters;
