
import {connect} from 'react-redux';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CreateProduct from '../admin/createProduct.jsx';
import Header from '../layout/header.jsx';
import Alert from '../layout/alert';
import {loadPermissions, loadUser} from '../../actions/auth';



const Admin = ({permission,loadPermissions}) => {
    
    
    useEffect(() => {
        loadPermissions();
        
        
    },[loadPermissions]);
    
    
   
    return (
        <div className="container-fluid">
            <Header/>
            <Alert/>
            { permission=="admin" ? <CreateProduct permission={permission}/> : <h1>notadmin</h1>}
        </div>
    );
}

Admin.propTypes = {
    loadPermissions: PropTypes.func.isRequired,

};


const mapStateToProps = state => ({
    permission:state.auth.permission,
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps,{loadPermissions,loadUser})(Admin);
