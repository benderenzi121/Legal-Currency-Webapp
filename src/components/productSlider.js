import React from 'react';
import ProductCard from './productCard';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
class ProductSlider extends React.Component {
    state = {  }
    render() { 
        const settings= {
            dots:true,
            infinite:true,
            speed:500,
            slidesToShow:4,
            slidesToScroll:1
        };
        return ( 
            <div class='container product-slider'>
                <h2>Featured Collection</h2>
                  <div class=''> 
                        <Slider {...settings}>
                            
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
            
                        </Slider>
            </div>
            </div>
            
            
         );
    }
}
 
export default ProductSlider;