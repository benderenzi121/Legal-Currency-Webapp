import React, { Component, Fragment } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import './styles/_index.scss';
import Header from './components/logoNav.jsx';
import Nav from './components/nav.jsx';
import Landing from './components/Pages/landing.jsx';
import Home from './components/Pages/home.jsx';
import Alert from './components/layout/alert.js';
//import ViewProduct from './components/Pages/viewProduct.jsx';
//redux 
import { Provider } from 'react-redux';
import store from './store';

const API_KEY = '';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: null
        };
    };

    componentDidMount(){
        console.log('componentDidMount ran');
        fetch('http://localhost:5000/api/users')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({ user: json });
            });
    }

    render(){
        return (
            <Provider store={store}>
            <Router>
                    {/* <Landing/> */}
                    <Header/>
                    <Alert/>
                    <Route path= '/' exact component={Landing}/>
                    <Route path='/home' exact component={Home}/>
                    
            </Router>
            </Provider>
        
        );
    };
}

export default App;