import React, { Component, Fragment } from 'react';
import Header from '../header.jsx';
import Nav from '../nav.jsx';
import Login from '../auth/Login.jsx';
import Alert from '../layout/alert';
class SignIn extends Component {
    state = {  }
    render() { 
        return ( 
        <Fragment>
            <Header/>
            <Alert/>
            <div className='container'>

            <Login/>
            </div>
            
        </Fragment> );
    }
}
 
export default SignIn;