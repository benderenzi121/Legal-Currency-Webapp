import React, { Component } from 'react';


export default function Featured({products}) {
    
            

    return products.map((product) => (
        
            <div className='col featured__item'>
                <img className='featured__image'src={product.url}></img>
                <h1 className='featured__item__title'>{product.title}</h1>
                <p className='featured__item__price'>{product.price}</p>
            </div>
        
    ));
}
