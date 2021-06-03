import React, { Component, Fragment } from "react";
import LogoNav from "../layout/logoNav.jsx";
import Welcome from "../home/welcome.jsx";
import Nav from "../layout/nav.jsx";
import Featured from "../home/featured.jsx";

const dummyItems = [
    {
        url: "https://www.petcareplus.ie/wp-content/uploads/2020/04/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
        title: "A very exciting Product",
        price: 4.2,
        description: "Smoke Grass Eat ass",
    },
    {
        url: "https://www.petcareplus.ie/wp-content/uploads/2020/04/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
        title: "Another great product",
        price: 3.8,
        description: "wow this is great",
    },
    {
        url: "https://www.petcareplus.ie/wp-content/uploads/2020/04/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
        title: "Dope product",
        price: 6.9,
        description: "no hope in dope",
    },
];

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { products: dummyItems };
    }

    render() {
        return (
            <Fragment>
                <div className="container-fluid">
                    <LogoNav />
                    <Welcome />
                    <Nav />

                    <div className="row">
                        <div className="featured col">
                            <div className="row">
                                <div className="col-lg-1">
                                    <i className=" featured__arrow featured__arrow-left fas fa-arrow-left" />
                                </div>
                                <Featured className="featured" products={this.state.products} />
                                <div className="col-lg-1">
                                    <i className=" featured__arrow featured__arrow-right fas fa-arrow-right" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Home;
