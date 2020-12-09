import React from 'react';

const ProductCard = (props) => (
    <div className='hoverme product'>
        <div className='product-top'>
            <img className='rounded-top' src={props.imageUrl}></img>
        </div>
        <div className='product-overlay '>
            <button type='button' className='btn btn-secondary' title='View Item'><i className="fas fa-eye"></i></button>
            <button type='button' className='btn btn-secondary' title='Add to cart'><i className="fas fa-cart-plus"></i></button>
        </div>
        <div className='product-bottom text-center rounded-bottom'>
            <h3>{props.title}</h3>
            <h5>{props.price}</h5>
        </div>
    </div>
);

export default ProductCard;