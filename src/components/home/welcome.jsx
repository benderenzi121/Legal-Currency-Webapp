import React, { Component } from "react";

class Welcome extends Component {
    render() {
        return (
            <div className="welcome row">
                <div className="col-md-12 ">
                    <h3 className="welcome__heading">Welcome to LegalCurrencyShop.com</h3>
                </div>
                <div className="col-md-12 welcome__sub-text">
                    <p>Buy drip here in the name of charity!</p>
                </div>
            </div>
        );
    }
}

export default Welcome;
