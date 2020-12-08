import React, { Component, Fragment } from 'react';
import './App.css';
import Header from './components/header';
import Nav from './components/nav';
import Slider from './components/slider';
import ProductSlider from './components/productSlider';

const API_KEY = '';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
<<<<<<< HEAD
            user:null
        }
=======
            user: null
        };
>>>>>>> 1701b56af77e93084521c5d5cfbba98bd6b87134
    };

    componentDidMount(){
        console.log('componentDidMount ran');
        fetch('http://localhost:5000/api/users')
            .then(response => response.json())
            .then(json => {
<<<<<<< HEAD
                this.setState({user:json})

            })
    }

    render(){
        return <h1>{user.firstName}</h1>
=======
                console.log(json);
                this.setState({ user: json });
            });
    }

    render(){
        return <Fragment>
            <Header/>
            <Nav/>
            <Slider/>
            <ProductSlider/>
        </Fragment>
>>>>>>> 1701b56af77e93084521c5d5cfbba98bd6b87134
    };
}

export default App;