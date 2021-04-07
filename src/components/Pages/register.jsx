import React, {Fragment} from 'react';
import Register from '../auth/Register.jsx';
import Alert from '../layout/alert';
import Header from '../layout/header.jsx';
export const Registration = () => {
    return (
        <Fragment>
            <div className='container-fluid'>
            <Header/>
            <Alert/>
            <div className='container register'>
            <Register/> 
            </div>
            </div>
    
        </Fragment>
    )
}

export default Registration;