import React, { Component } from 'react';
import FooterCol from './footerCol.jsx';
class Footer extends Component {
    render() {
        return (
            <div className="container-fluid footer">
                <div className="row">
                    <FooterCol title='About' linkOne='1293 richmond rd. 10308' linkTwo='Staten Island NY'/>
                    <FooterCol title='Social' linkOne='Twitter' linkTwo='Instagram' linkThree='facebook'/>
                    <FooterCol title='Contact' linkOne='AmazingGamesTCG@gmail.com'/>
                    <FooterCol title='Important links' linkOne='Ebay Store' linkTwo='TCG player store'/>
                </div>
            </div>
        );
    }
}

export default Footer;