import React, { Component } from 'react';

import LogoNav from './logoNav.jsx';
import Nav from './nav.jsx';

export default class Header extends Component {
    render() {
        return (
            <div>
                <LogoNav/>
                <Nav/> 
            </div>
        )
    }
}

