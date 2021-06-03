import React, { Component, Fragment } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./styles/_index.scss";
import Footer from "./components/layout/footer.jsx";
import Landing from "./components/Pages/landing.jsx";
import Home from "./components/Pages/home.jsx";
import Alert from "./components/layout/alert.js";
import SignIn from "./components/Pages/login.jsx";
import Products from "./components/Pages/products.jsx";
import Product from "./components/products/product.jsx";
import Orders from "./components/Pages/orders.jsx";
import Order from "./components/orders/order.jsx";

import Cart from "./components/Pages/cart.jsx";
import Registration from "./components/Pages/register.jsx";
import Admin from "./components/Pages/admin.jsx";
import CreateProduct from "./components/admin/createProduct.jsx";
import adminProducts from "./components/admin/adminProducts.jsx";
import Success from "./components/Pages/Success.jsx";
import { loadPermissions } from "./actions/auth";

//import ViewProduct from './components/Pages/viewProduct.jsx';
//redux
import { Provider } from "react-redux";
import PrivateRoute from "./components/routing/PrivateRoute";
import AdminRoute from "./components/routing/AdminRoute";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    componentDidMount() {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        store.dispatch(loadUser());
    }

    render() {
        return (
            <div className="page-container">
                <Provider store={store}>
                    <Router>
                        <div className="content-wrapper">
                            <Route path="/" exact component={Products} />
                            <Route path="/login" exact component={SignIn} />
                            <PrivateRoute path="/cart" exact component={Cart} />
                            <Route path="/products" exact component={Products} />
                            <Route path="/Products/:id" exact component={Product} />
                            <Route path="/register" exact component={Registration} />
                            <PrivateRoute path="/success" exact component={Success} />

                            <PrivateRoute path="/orders" exact component={Orders} />
                            <PrivateRoute path="/orders/:id" exact component={Order} />

                            <AdminRoute path="/admin" component={Admin} />
                        </div>
                        <Footer />
                    </Router>
                </Provider>
            </div>
        );
    }
}

export default App;
