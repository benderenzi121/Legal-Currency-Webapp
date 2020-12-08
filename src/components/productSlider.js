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
            slidesToScroll:1, 
            arrows:false
        };
        return ( 
            <div className='container-fluid product-slider'>
                <h2>Featured Collection</h2>
                <div className='row'> 
                    <div className='col-md-3 hoverme'>
                      <div className='product-top'>
                        <img className='rounded-top' src='https://i.ebayimg.com/images/g/UScAAOSw0t5e4of2/s-l640.jpg'></img>
                        </div>
                        
                        <div className='product-overlay '>
                            <button type='button' className='btn btn-secondary' title='View Item'><i className="fas fa-eye"></i></button>
                            <button type='button' className='btn btn-secondary' title='Add to cart'><i className="fas fa-cart-plus"></i></button>
                        </div>
                        <div className='product-bottom text-center rounded-bottom'>
                           <h3>MTG Core 20221</h3> 
                           <h5>$89</h5> 
                        </div>
                    </div>
                    <div className='col-md-3 hoverme'>
                      <div className='product-top'></div>  
                        <img className='rounded-top' src='https://i.ebayimg.com/images/g/UScAAOSw0t5e4of2/s-l640.jpg'></img>
                        <div className='product-overlay'>
                            <button type='button' className='btn btn-secondary' title='Quick Shop'><i className="fas fa-eye"></i></button>
                            <button type='button' className='btn btn-secondary' title='Quick Shop'><i className="fas fa-cart-plus"></i></button>
                        </div>
                        <div className='product-bottom text-center rounded-bottom'>
                           <h3>MTG Core 20221</h3> 
                           <h5>$89</h5> 
                        </div>
                    </div>
                    <div className='col-md-3 hoverme'>
                      <div className='product-top'>  
                        <img className='rounded-top' src='https://i.ebayimg.com/images/g/UScAAOSw0t5e4of2/s-l640.jpg'></img>
                        </div>
                        <div className='product-overlay'>
                            <button type='button' className='btn btn-secondary' title='Quick Shop'><i className="fas fa-eye"></i></button>
                            <button type='button' className='btn btn-secondary' title='Quick Shop'><i className="fas fa-cart-plus"></i></button>
                        </div>
                        <div className='product-bottom text-center rounded-bottom'>
                           <h3>MTG Core 20221</h3> 
                           <h5>$89</h5> 
                        </div>
                    </div>
                    <div className='col-md-3 hoverme'>
                      <div className='product-top'></div>  
                        <img className='rounded-top' src='https://i.ebayimg.com/images/g/UScAAOSw0t5e4of2/s-l640.jpg'></img>
                        <div className='product-overlay'>
                            <button type='button' className='btn btn-secondary' title='Quick Shop'><i className="fas fa-eye"></i></button>
                            <button type='button' className='btn btn-secondary' title='Quick Shop'><i className="fas fa-cart-plus"></i></button>
                        </div>
                        <div className='product-bottom text-center rounded-bottom'>
                           <h3>MTG Core 20221</h3> 
                           <h5>$89</h5> 
                        </div>
                    </div>
                </div>       
            </div>
            
            
            
         );
    }
}
 
export default ProductSlider;