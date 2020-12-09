import React, { Component, Fragment } from 'react';
import './App.css';
import Header from './components/header';
import Nav from './components/nav';
import Slider from './components/slider';
import Landing from './components/landing';
import ProductSlider from './components/productSlider';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

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
        return <Fragment>
            <Router>
                <Route path="/" exact component={Landing}/>
                <Route path="/" exact component={Header}/>
                <Route path="/" exact component={Nav}/>
                <Route path="/" exact component={Slider}/>
                <Route path="/" exact component={ProductSlider}/>
                
            </Router>
        </Fragment>
    };
}

export default App;