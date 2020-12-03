import React from 'react';
import '../styles/ProductSlider.css';

class ProductSlider extends React.Component {
    state = {  }
    render() { 
        return ( 
            <div class='container-fluid product-slider'>
                <h2>Featured Collection</h2>
                <div class='row'> 
                    <div class='col-md-3 hoverme'>
                      <div class='product-top'>
                        <img class='rounded-top' src='https://i.ebayimg.com/images/g/UScAAOSw0t5e4of2/s-l640.jpg'></img>
                        </div>
                        
                        <div class='product-overlay '>
                            <button type='button' class='btn btn-secondary' title='View Item'><i class="fas fa-eye"></i></button>
                            <button type='button' class='btn btn-secondary' title='Add to cart'><i class="fas fa-cart-plus"></i></button>
                        </div>
                        <div class='product-bottom text-center rounded-bottom'>
                           <h3>MTG Core 20221</h3> 
                           <h5>$89</h5> 
                        </div>
                    </div>
                    <div class='col-md-3 hoverme'>
                      <div class='product-top'></div>  
                        <img class='rounded-top' src='https://i.ebayimg.com/images/g/UScAAOSw0t5e4of2/s-l640.jpg'></img>
                        <div class='product-overlay'>
                            <button type='button' class='btn btn-secondary' title='Quick Shop'><i class="fas fa-eye"></i></button>
                            <button type='button' class='btn btn-secondary' title='Quick Shop'><i class="fas fa-cart-plus"></i></button>
                        </div>
                        <div class='product-bottom text-center rounded-bottom'>
                           <h3>MTG Core 20221</h3> 
                           <h5>$89</h5> 
                        </div>
                    </div>
                    <div class='col-md-3 hoverme'>
                      <div class='product-top'>  
                        <img class='rounded-top' src='https://i.ebayimg.com/images/g/UScAAOSw0t5e4of2/s-l640.jpg'></img>
                        </div>
                        <div class='product-overlay'>
                            <button type='button' class='btn btn-secondary' title='Quick Shop'><i class="fas fa-eye"></i></button>
                            <button type='button' class='btn btn-secondary' title='Quick Shop'><i class="fas fa-cart-plus"></i></button>
                        </div>
                        <div class='product-bottom text-center rounded-bottom'>
                           <h3>MTG Core 20221</h3> 
                           <h5>$89</h5> 
                        </div>
                    </div>
                    <div class='col-md-3 hoverme'>
                      <div class='product-top'></div>  
                        <img class='rounded-top' src='https://i.ebayimg.com/images/g/UScAAOSw0t5e4of2/s-l640.jpg'></img>
                        <div class='product-overlay'>
                            <button type='button' class='btn btn-secondary' title='Quick Shop'><i class="fas fa-eye"></i></button>
                            <button type='button' class='btn btn-secondary' title='Quick Shop'><i class="fas fa-cart-plus"></i></button>
                        </div>
                        <div class='product-bottom text-center rounded-bottom'>
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