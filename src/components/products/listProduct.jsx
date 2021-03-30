import React, {Fragment} from 'react'


 const ListProduct = ({products, loading}) => {
    if(loading){
        return <h2>loading...</h2>
    }
    return (
       <ul className='list-group mb-4'>
           <div className='row'> 
           {products.map(product => (
               <Fragment>
                 
                   <div className='col-4'>
                   <li key={product._id} className='product-list__item '>
                       <img className='product-list__item__img' src={product.imagePath} alt=""/>
                       <h3 className='product-list__item__title'>{product.title}</h3>
                       <p>{product.description}</p>
                       <p>$ {product.price}</p>
                       <div className='row'>
                       {product.tag.map(tag => (
                           <div className='col-6'>
                           <p className='product-list__item__tag'>{tag}</p>
                           </div>
                       ))}
                       </div>
                       
                    </li>
                    </div>
                    
                   
                </Fragment>
               ))};
            </div> 
       </ul>
    )
}

export default ListProduct;