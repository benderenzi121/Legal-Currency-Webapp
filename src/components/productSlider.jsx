import React from 'react';
import ProductCard from '../components/productCard.jsx';
import Slider from "react-slick";

// const Arrow = (props) => {
//     const { className, style, onClick } = props;
//     return <div className={className} style={...style} onClick={onClick} />
// };

const ProductSlider = (props) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        // nextArrow: <div className="" />,
        // prevArrow: <Arrow />
    };

    // mock data will be replaced by array of data from props
    const mockData = [
        { title: 'MTG Core 2020', price: '$89', imageUrl: 'https://i.ebayimg.com/images/g/UScAAOSw0t5e4of2/s-l640.jpg' },
        { title: 'DBZ Vermilion Bloodline', price: '$75', imageUrl: 'https://i.ebayimg.com/images/g/E18AAOSwsOBfxnd3/s-l1600.jpg' },
        { title: 'Yu-Gi-Oh Phantom Rage', price: '$55', imageUrl: 'https://i.ebayimg.com/images/g/mAcAAOSwkmZfj87N/s-l640.png' },
        { title: 'Freddie Funko Mad Hater', price: '$240', imageUrl: 'https://stockx.imgix.net/products/collectibles/Funko-Pop-Freddy-Funko-as-Mad-Hatter-SDCC-Figure-43.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1603481985' },
        { title: 'MTG Black Lotus', price: '$41999', imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTUo8Bi8D3QbQCKJ2NMuhB2J-ORBB-rj4ycM5u2BlBhHjUbLOHjIPmqy3dQVP7SBz7U4klPPoDk9zp26yc1nolXWDZqwpmBU3q3uief7L0&usqp=CAc' }
    ];

    const getProductCards = () => {
        return mockData.map(productCardData => <ProductCard title={productCardData.title} price={productCardData.price} imageUrl={productCardData.imageUrl} />);
    };

    return (
        <div className='container-fluid product-slider'>
            <h2>Featured Collection</h2>
            <Slider {...settings}>
                {getProductCards()}
            </Slider>
        </div>
    );
}

export default ProductSlider;