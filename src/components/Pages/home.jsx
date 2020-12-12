import React, { Component, Fragment } from 'react';
import BannerSlider from '../bannerSlider.jsx';
import ProductSlider from '../productSlider.jsx';
import Header from '../header.jsx';
import Footer from '../footer.jsx';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        return ( 
            <Fragment>
                <Header/>
                <BannerSlider/>
                <ProductSlider/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Home;