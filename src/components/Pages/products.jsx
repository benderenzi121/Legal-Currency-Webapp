import store from '../../store';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, { useEffect, useState,Fragment} from 'react';
import {getProducts} from '../../actions/product';
import LogoNav from '../logoNav.jsx';
import Nav from '../nav.jsx';
import Footer from '../footer.jsx'
import ListProduct from '../products/listProduct.jsx'


const Products = ({products:{products,loading},getProducts}) => {
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage,setPostsPerPage] = useState(10);
    
    useEffect(() => {
        getProducts();
        
        
    },[getProducts]);
    return (
        <Fragment>
        <div className='container-fluid'>
        <LogoNav/>
        <Nav/>
        
        <div className='product-list'>
        <h1> products </h1>
        <ListProduct products={products} loading={loading}/>   
        </div>
    </div>
    
    </Fragment>
     );
};

Products.propTypes = {
    getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    products: state.product
});

export default connect(mapStateToProps, { getProducts })(Products)
