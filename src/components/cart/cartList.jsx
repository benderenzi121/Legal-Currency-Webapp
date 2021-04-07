import React from 'react';
import {connect} from 'react-redux';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import {removeFromCart} from '../../actions/cart';

const CartList = ({cart,removeFromCart}) => {
    console.log(cart);
    

    return (
        <Fragment>
            <tbody>
            <tr>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th></th>
            </tr>
            
            {cart.map(item => (
                <tr className='cart__table__item' key={item.product._id}>
                <td>
                    
                        <div className='col'>
                            <img className='cart__table__item__img' src={item.product.imagePath}/>
                        </div>
                        <div className='col'>
                            <p className='cart__table__item__title'>{item.product.title} </p>
                        </div>
                    
                </td>
                <td><p>{item.qty}</p></td>
                <td><p>{item.product.price.toFixed(2)}</p></td>
                <td><p>{item.total.toFixed(2)}</p></td>
                <td><button onClick={async () => removeFromCart(item.product._id.toString(),1)}>REMOVE 1 </button></td>
                </tr>
            ))}
            </tbody>
        </Fragment>
    )
}
CartList.propTypes = {
    removeFromCart: PropTypes.func.isRequired,
}
 export default connect (null,{removeFromCart})(CartList);