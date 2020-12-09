import React from 'react';
class Nav extends React.Component {
    state = {}
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm mynav row">
                    <ul className="navbar-nav col-sm">
                        <li className="nav-item col-lg-8 "></li>
                        <li className="nav-item col-lg-3 nav-center">
                            <a className="nav-text" href="#">
                                View Products
                            </a>
                        </li>
                        <li className="nav-item nav-right col-lg-1">
                            <a className="nav-text" href="#">
                                <i className="fas fa-shopping-cart"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Nav;
