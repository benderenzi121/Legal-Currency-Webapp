import React, {useState} from 'react';
import {connect} from 'react-redux';
import Alert from '../layout/alert';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {loadUser} from '../../actions/auth';
import {createProduct} from '../../actions/product';
const CreateProduct = ({permission, createProduct,loadUser}) => {
   
   const [formData, setFormData] = useState({
    title:'',
    description:'',
    price:'',
    tags:'',
    imagePath:'',
    inStock:'',
    pricePaid:'',

});

    const { title, description, price, tags, imagePath, inStock, pricePaid } = formData;

    const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = async (e) => {
        e.preventDefault();
        createProduct({title, description, price,tags, imagePath, inStock, pricePaid});
    }

    return (
        <div className = 'create-product'>
            <div className='create-product__background'>
            <Alert/>
            <h1 className='large create-product__title'>Add a product to the database</h1>
            <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
            <input
                type="text"
                placeholder="title"
                name="title"
                value={title}
                onChange={onChange}
                required
            />
            </div>
            <div className="form-group">
            <input
                type="text"
                placeholder="description"
                name="description"
                value={description}
                onChange={onChange}
                required
            />
            </div>
            <div className="form-group">
            <input
                type="number"
                placeholder="price"
                name="price"
                value={price}
                onChange={onChange}
                required
            />
            </div>
            <div className="form-group">
            <input
                type="url"
                placeholder="image Path"
                name="imagePath"
                value={imagePath}
                onChange={onChange}
                required
            />
            </div>
            <div className="form-group">
            <input
                type="number"
                placeholder="Quantity"
                name="inStock"
                value={inStock}
                onChange={onChange}
                required
            />
            </div>
            <div className="form-group">
            <input
                type="number"
                placeholder="purchase price"
                name="pricePaid"
                value={pricePaid}
                onChange={onChange}
                required
            />
            </div>
            <div className="form-group">
            <input
                type="text"
                placeholder="Add tags"
                name="tags"
                value={tags}
                onChange={onChange}
            />
            </div>

            <input type="submit" className="btn btn-primary register__btn" value="Add Product" />
        </form>
        </div>
            </div>
    )
}





export default connect(null,{createProduct,loadUser})(CreateProduct);