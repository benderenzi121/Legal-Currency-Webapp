import React, {useEffect,Fragment} from 'react'
import {connect} from 'react-redux';
import {getCart} from '../../actions/cart';
import PropTypes from 'prop-types';
import CartList from '../cart/cartList.jsx';

const Cart = ({cart:{cart},getCart}) => {
    
    useEffect(() => { 
        getCart();
        
    },[getCart]);

   
    return (
        
            <div className='container'>
            <CartList cart={cart} />
            </div>
        

    )
}
Cart.propTypes = {
    getCart: PropTypes.func.isRequired,
    cart: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    cart: state.cart,
    
});

export default connect(mapStateToProps,{getCart})(Cart)