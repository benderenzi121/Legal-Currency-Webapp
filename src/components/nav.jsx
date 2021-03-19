import React, { Fragment } from 'react';
import {Link, Switch} from 'react-router-dom';
class Nav extends React.Component {
    state = {}
    render() {
        return (
            <div>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Left</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="//codeply.com">Codeply</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Right</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                        </div>
        );
    }
}

export default Nav;
