import React from 'react'
import { Fragment } from 'react';

const CartList = ({cart}) => {
    console.log(cart);

    return (
        <div>
            {cart.map(item => (
                <li key={item.product._id}>
                <p>{item.qty}</p>
                </li>
            ))}
        </div>
    )
}
 export default CartList;