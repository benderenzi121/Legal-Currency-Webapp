import React, { Component, Fragment } from 'react';
import BannerSlider from '../bannerSlider.jsx';
import ProductSlider from '../productSlider.jsx';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        return ( 
            <Fragment>
                <BannerSlider/>
                <ProductSlider/>
            </Fragment>
        );
    }
}

export default Home;