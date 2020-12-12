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
        <h2>Custom Paging</h2>
        <Slider {...settings}>
          <div>
            <img src="https://lh3.googleusercontent.com/proxy/EvfYhQb11baSLEY0c1IJNCG86MwfPIQmv56WXchFookAYuxyBkFaO5LCZjSJbf9sZdeK7K6XsKZl1QWkp8EqYCxZISIHSvHH1DpMnKIyKcWiav4ToIgpTHA" />
          </div>
          <div>
            <img src="https://lh3.googleusercontent.com/proxy/EvfYhQb11baSLEY0c1IJNCG86MwfPIQmv56WXchFookAYuxyBkFaO5LCZjSJbf9sZdeK7K6XsKZl1QWkp8EqYCxZISIHSvHH1DpMnKIyKcWiav4ToIgpTHA" />
          </div>
          <div>
            <img src="https://lh3.googleusercontent.com/proxy/EvfYhQb11baSLEY0c1IJNCG86MwfPIQmv56WXchFookAYuxyBkFaO5LCZjSJbf9sZdeK7K6XsKZl1QWkp8EqYCxZISIHSvHH1DpMnKIyKcWiav4ToIgpTHA" />
          </div>
        </Slider>
      </div>
    );
  }
}