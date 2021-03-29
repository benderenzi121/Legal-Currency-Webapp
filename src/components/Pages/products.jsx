import store from '../../store';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, { Component } from 'react';
import {getProducts} from '../../actions/product';
import LogoNav from '../logoNav.jsx';
import Nav from '../nav.jsx';


class Products extends Component {
    componentDidMount(){
        try{
           store.dispatch(getProducts());
        }
        catch(err){
            console.error(err);
        }
        
    }
    render() {
        return (
            <div className ='container-fluid'>
                <LogoNav/>
                <Nav/>
                <h1>products</h1>
            </div>
        )
    }
}
Products.propTypes = {
    getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    products: state.products
});

export default connect(mapStateToProps, { getProducts })(Products)
