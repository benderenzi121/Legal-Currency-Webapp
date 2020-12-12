import React, { Component } from 'react';
import Header from '../header.jsx';
import Footer from '../footer.jsx';
import ItemScope from '../itemScope.jsx';

class ViewProduct extends Component {
    render() {
        return (
            <div>
                <Header/>
                    <ItemScope/>
                <Footer/>
            </div>
        );
    }
}

export default ViewProduct;