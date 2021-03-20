import React, { Component, Fragment } from 'react';
import Header from '../header.jsx';
import Register from '../../components/auth/Register.jsx';
import Login from '../../components/auth/Login.jsx';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        return ( 
            <Fragment>
                <Header/>
                    <div className = 'container'>
                <Register/>
                
                </div>
                
            </Fragment>
        );
    }
}

export default Home;