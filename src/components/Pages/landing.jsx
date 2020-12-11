import React from 'react';
import {Link, Switch} from 'react-router-dom';

const Landing = () => (
    <header id="showcase">
        <div className="landing">
            <h1>Amazing Games TCG</h1>
            <p>Crack some boxes, Protect your collection, We gotchu on alla dat</p>
            <Link to="/home" className="button">Browse Products</Link>  
        </div>
    </header>
);

export default Landing;