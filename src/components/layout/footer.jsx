import React, { Component } from "react";
import ebay from "../../static/img/ebay.jpg";
import facebook from "../../static/img/facebook.png";
import insta from "../../static/img/insta.png";

class Footer extends Component {
    state = {};
    render() {
        return (
            <div className="row footer">
                <div className="row"></div>
                <div className="col-2 footer__column">
                    <div className="col">
                        <h1 className="footer__column__title">About</h1>
                        <hr />
                        <li className="footer__column__subText">New York City designed streetwear</li>
                        <li className="footer__column__subText">10% proceeds go to x charity</li>
                        <li className="footer__column__subText">drip!</li>
                    </div>
                </div>

                <div className="col-2"></div>
                <div className="col footer__column">
                    <h1 className="footer__column__title">Social</h1>
                    <hr />
                    <div className="row">
                        <a className="col" href="https://www.ebay.com/str/amazinggamestcg">
                            <img className="footer__socialIcn" src={ebay}></img>
                        </a>
                        <a className="col" href="https://www.facebook.com/AmazingGamesTCG/">
                            <img className="footer__socialIcn" src={facebook}></img>
                        </a>
                        <a className="col" href="https://www.instagram.com/amazinggamestcg/">
                            <img className="footer__socialIcn" src={insta}></img>
                        </a>
                    </div>
                    <p className="footer__trademark">© 2021 Legal Currency. All rights Reserved .</p>
                </div>
                <div className="col-2"></div>
                <div className="col-2 footer__column">
                    <h1 className="footer__column__title">Contact</h1>
                    <hr />
                    <li className="footer__column__subText">Phone#: 646-600-3889</li>
                    <li className="footer__column__subText">Address: 3189 Richmond Rd</li>
                    <li className="footer__column__subText">Email: AmazingGames@gmail.com</li>
                </div>
            </div>
        );
    }
}

export default Footer;
