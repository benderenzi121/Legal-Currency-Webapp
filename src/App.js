import React, { Component, Fragment } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import './styles/_index.scss';
import Footer from './components/footer.jsx';
import Nav from './components/nav.jsx';
import Landing from './components/Pages/landing.jsx';
import Home from './components/Pages/home.jsx';
import Alert from './components/layout/alert.js';
import SignIn from './components/Pages/login.jsx';
import Products from './components/Pages/products.jsx';
import Cart from './components/Pages/cart.jsx';

//import ViewProduct from './components/Pages/viewProduct.jsx';
//redux 
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';



class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: null
        };
    };

    componentDidMount(){
        if (localStorage.token) {
            setAuthToken(localStorage.token);
          }
          store.dispatch(loadUser());

    }

    render(){
        return (
            <div className='page-container'>
           
            <Provider store={store}>
            <Router>
                    
                <div className='content-wrapper'>
                    
                    <Route path= '/' exact component={Landing}/>
                    <Route path='/home' exact component={Home}/>
                    <Route path='/login' exact component={SignIn}/>
                    <Route path='/cart' exact component={Cart}/>
                    <Route path='/products' exact component={Products}/>
                </div>    
                <Footer/>
            </Router>
            </Provider>
            
            </div>
        );
    };
}

export default App;