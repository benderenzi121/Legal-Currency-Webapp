import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { loadUser, register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert("Passwords do not match", "danger");
        } else {
            register({ name, email, password });
            loadUser();
        }
    };

    if (isAuthenticated) {
        return <Redirect to="/products" />;
    }

    return (
        <Fragment>
            <div className="register__background">
                <h1 className="large register__title">Sign Up</h1>
                <p className="lead register__sub-title">
                    <i className="fas fa-user" /> Create Your Account
                </p>
                <form className="form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={onChange} />
                    </div>
                    <input type="submit" className="register__btn" value="Register" />
                </form>
                <p className=" register__redirect">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
