import React, { Component, Fragment } from 'react';
import './App.css';
import Header from './components/header';
import Nav from './components/nav';
import BannerSlider from './components/bannerSlider';
import ProductSlider from './components/productSlider';
import Landing from './components/landing';

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
            <Fragment>
                {/* <Landing/> */}
                <Header/>
                <Nav/>
                <BannerSlider/>
                <ProductSlider/>
            </Fragment>
        );
    };
}

export default App;