
import {connect} from 'react-redux';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CreateProduct from '../admin/createProduct.jsx';
import {loadPermissions, loadUser} from '../../actions/auth';



const Admin = ({permission,loadPermissions}) => {
    
    
    useEffect(() => {
        loadPermissions();
        
        
    },[loadPermissions]);
    
    
   
    return (
        <div>
            <CreateProduct permission={permission}/>
        </div>
    );
}

Admin.propTypes = {
    loadPermissions: PropTypes.func.isRequired,

};


const mapStateToProps = state => ({
    permission:state.auth.permission
})


export default connect(mapStateToProps,{loadPermissions,loadUser})(Admin);
