import React, { Component } from 'react';
import ProductDisplay from './productDisplay.jsx'

class ItemScope extends Component {
    render() {
        return (
            <div className="container item-scope">
                <div className="row">
                <div className="col-md-5 item-scope__content-col">
                    <ProductDisplay/>
                </div>
                <div className="col-md-7 item-scope__content-col">
                    <h1>Hallo Hallo Hallo Hallo</h1>
                </div>
                </div>
            </div>
        );
    }
}

export default ItemScope;