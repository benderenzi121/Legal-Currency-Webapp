import React from 'react';
import '../styles/ProductSlider.css';
class ProductCard extends React.Component {
    state = {  }
    render() { 
        return ( 
            <div class='hoverme product'>
                      <div class='product-top'>
                        <img class='rounded-top' src='https://i.ebayimg.com/images/g/UScAAOSw0t5e4of2/s-l640.jpg'></img>
                        </div>
                        
                        <div class='product-overlay '>
                            <button type='button' class='btn btn-secondary' title='View Item'><i class="fas fa-eye"></i></button>
                            <button type='button' class='btn btn-secondary' title='Add to cart'><i class="fas fa-cart-plus"></i></button>
                        </div>
                        <div class='product-bottom text-center rounded-bottom'>
                           <h3>MTG Core 2021</h3> 
                           <h5>$89</h5> 
            </div>
            </div>
         );
    }
}
 
export default ProductCard;