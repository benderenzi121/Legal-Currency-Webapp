import React, { Component } from 'react';
import ProductDisplay from './productDisplay.jsx';
import QuantitySelector from './quantitySelector.jsx';
import Button from '@material-ui/core/Button';

class ItemScope extends Component {
    render() {
        return (
            <div className="container item-scope">
                <div className="row">
                <div className="col-md-4 item-scope__content-col">
                    <ProductDisplay/>
                </div>
                <div className="col-md-8 item-scope__content-col item-scope__description-col">
                    <div className="item-scope__title-section">
                    <h1 className="item-scope__title">Product Title</h1>
                    <h1 className="item-scope__sub-title">Sub Title</h1>
                    </div>

                    <h2 className="item-scope__description">Description</h2>
                    
                    <p className="item-scope__description-item">Very cool Product</p>
                    <p className="item-scope__description-item">This product is the best actually</p>
                    <p className="item-scope__description-item">Wow</p>
                    
                    <div className='row'>
                    <QuantitySelector className="col-md-5 item-scope__cart-button"/>
                    <div className="col-md-4"></div>
                    <Button className="col-md-3"variant="contained">ADD TO CART</Button>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default ItemScope;