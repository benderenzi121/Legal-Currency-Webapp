import React, { Component } from 'react';

const FooterCol = (props) => (
            
            <div className="col-md-3">
                <p className="footer__title">{props.title}</p>
                    <ul className="footer__ul">
                    <li ><a className="footer__content" href="#buylist">{props.linkOne}</a></li>
                    <li><a className="footer__content" href="/collections/events">{props.linkTwo}</a></li>
                    <li><a className="footer__content" href="/pages/contact-us"><p>{props.linkThree}</p></a></li>
                </ul>
            </div>
            
        );
  

export default FooterCol;