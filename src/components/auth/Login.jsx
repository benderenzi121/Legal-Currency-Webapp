import React, {Fragment, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loadUser, login} from '../../actions/auth';
import Alert from '../layout/alert';
import axios from 'axios';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] =useState({
        email:'',
        password:'',
    });

    const {email, password} = formData;

    const onChange = e => setFormData({ ...formData,[e.target.name]:e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        await loadUser();
        await login(email,password);
        
    }
    // Redirect if logged in
    if (isAuthenticated){
      return <Redirect to ='home'/>
    }
    return (
      
        <Fragment>
            
            <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/login">Sign In</Link>
      </p>
        </Fragment>
    )
    };

    Login.propTypes ={
      login: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool,
    }

    const mapStateToProps = state => ({
      isAuthenticated: state.auth.isAuthenticated
    })
    export default connect (mapStateToProps, { login }) (Login);

