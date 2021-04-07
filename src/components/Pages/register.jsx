import React, {Fragment} from 'react';
import Register from '../auth/Register.jsx';
import Header from '../header.jsx';
export const Registration = () => {
    return (
        <Fragment>
            <div className='container-fluid'>
            <Header/>
            <div className='container register'>
            <Register/> 
            </div>
            </div>
    
        </Fragment>
    )
}

export default Registration;