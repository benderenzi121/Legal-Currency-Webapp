import React from 'react';
import '../styles/ProductSlider.css';
class ProductCard extends React.Component {
    state = {  }
  
    render() { 
        return ( 
            <div className='hoverme product'>
                      <div className='product-top'>
                        <img className='rounded-top' src={this.props.imageUrl}></img>
                        </div>
                        
                        <div className='product-overlay '>
                            <button type='button' className='btn btn-secondary' title='View Item'><i className="fas fa-eye"></i></button>
                            <button type='button' className='btn btn-secondary' title='Add to cart'><i className="fas fa-cart-plus"></i></button>
                        </div>
                        <div className='product-bottom text-center rounded-bottom'>
                           <h3>{this.props.title}</h3> 
                           <h5>{this.props.price}</h5> 
            </div>
            </div>
         );
    }
}
 
export default ProductCard;