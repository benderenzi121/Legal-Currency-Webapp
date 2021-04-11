import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {loadUser} from '../../actions/auth';
const CreateProduct = ({permission}) => {
   console.log(permission);
    
     
    return (
        <div>
            { permission == 'admin' ? <h1>admin</h1> : <h1>not an admin</h1>}
        </div>
    )
}





export default CreateProduct;