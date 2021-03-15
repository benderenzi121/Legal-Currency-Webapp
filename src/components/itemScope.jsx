import React, { Component } from 'react';
import ProductDisplay from './productDisplay.jsx';
import QuantitySelector from './quantitySelector.jsx';
import Button from '@material-ui/core/Button';

class ItemScope extends Component {
    render() {
        return (
            <div className="container item-scope">
                <button className="item-scope__back-btn"><i class="fas fa-arrow-left"></i></button>
                <div className="row">
                <div className="col-md-5 item-scope__content-col item-scope__image-col">
                    <ProductDisplay/>
                </div>
                <div className="col-md-1"></div>
                <div className="container-fluid col-md-6 item-scope__content-col item-scope__description-col">
                    <div className="item-scope__title-section">
                    <h1 className="item-scope__title">Product Title</h1>
                    <h1 className="item-scope__sub-title">Sub Title</h1>
                    </div>

                    <h2 className="item-scope__description">Description</h2>
                    
                    <p className="item-scope__description-item">Very cool Product</p>
                    <p className="item-scope__description-item">This product is the best actually</p>
                    <p className="item-scope__description-item">Wow</p>
                    
                    <h2 className="item-scope__price">Price</h2>
                    <p className="item-scope__description-item">$4.20</p>

                    <div className='row'>
                    <div className="col-md-6">
                        {/* <QuantitySelector/> */}
                    </div>
                    
                    <div className="col-md-6">
                        <button className="item-scope__cart-button "><i className="fas fa-cart-plus"></i></button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default ItemScope;