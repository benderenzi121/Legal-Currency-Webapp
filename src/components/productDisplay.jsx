import React, { Component } from "react";
import Slider from "react-slick";


export default class ProductDisplay extends Component {
  render() {
    const settings = {
      customPaging: function(i) {
        return (
          <a>
            <img className='product-display__active-img' src="https://lh3.googleusercontent.com/proxy/EvfYhQb11baSLEY0c1IJNCG86MwfPIQmv56WXchFookAYuxyBkFaO5LCZjSJbf9sZdeK7K6XsKZl1QWkp8EqYCxZISIHSvHH1DpMnKIyKcWiav4ToIgpTHA" />
          </a>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="product-display" >
        <Slider {...settings}>
          <div>
            <img src="https://images-na.ssl-images-amazon.com/images/I/51lYgLHRjML._SY341_BO1,204,203,200_.jpg" />
          </div>
          <div>
            <img src="https://images-na.ssl-images-amazon.com/images/I/81izfwKK+UL.jpg" />
          </div>
          <div>
            <img src="https://www.amazon.com/Dragon-Ball-Complete-Box-Set/dp/1974708721/ref=asc_df_1974708721/?tag=hyprod-20&linkCode=df0&hvadid=343985531419&hvpos=&hvnetw=g&hvrand=18023872224274775081&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9004155&hvtargid=pla-765869304892&psc=1&tag=&ref=&adgrpid=69543898272&hvpone=&hvptwo=&hvadid=343985531419&hvpos=&hvnetw=g&hvrand=18023872224274775081&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9004155&hvtargid=pla-765869304892" />
          </div>
        </Slider>
      </div>
    );
  }
}