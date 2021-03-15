import React, { Fragment } from 'react';
import {Link, Switch} from 'react-router-dom';
class Nav extends React.Component {
    state = {}
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm mynav row">
                    <ul className="navbar-nav col-sm">
                        <Switch>
                            <li className="nav-item col-lg-8 "></li>
                            <li className="nav-item col-lg-3 nav-center">
                                <Link to='/' className="nav-text" href="#">
                                    View Products
                                </Link>
                            </li>
                            <li className="nav-item nav-right col-lg-1">
                                <Link to='/' className="nav-text" href="#">
                                    <i className="fas fa-shopping-cart"></i>
                                </Link>
                            </li>
                        </Switch>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Nav;
