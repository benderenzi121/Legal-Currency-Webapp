import React from 'react';
import ProductCard from './productCard';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
class ProductSlider extends React.Component {
    state = {  }
    render() { 
        const settings= {
            dots:true,
            infinite:true,
            speed:500,
            slidesToShow:4,
            slidesToScroll:2, 
            arrows:false
        };
        return ( 
            <div className='container-fluid product-slider'>
                <h2>Featured Collection</h2>
                <div > 
                <Slider {...settings}>
                            
                            <ProductCard title="MTG Core 2020" price ='$89' img='https://i.ebayimg.com/images/g/UScAAOSw0t5e4of2/s-l640.jpg'/>
                            <ProductCard title="DBZ Vermilion Bloodline" price ='$75' img ='https://i.ebayimg.com/images/g/E18AAOSwsOBfxnd3/s-l1600.jpg'/>
                            <ProductCard title="Yu-Gi-Oh Phantom Rage" price ='$55' img="https://i.ebayimg.com/images/g/mAcAAOSwkmZfj87N/s-l640.png"/>
                            <ProductCard title="Freddie Funko Mad Hater" price ='$240' img="https://stockx.imgix.net/products/collectibles/Funko-Pop-Freddy-Funko-as-Mad-Hatter-SDCC-Figure-43.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1603481985"/>
                            <ProductCard title="MTG Black Lotus" price ='$41999' img="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTUo8Bi8D3QbQCKJ2NMuhB2J-ORBB-rj4ycM5u2BlBhHjUbLOHjIPmqy3dQVP7SBz7U4klPPoDk9zp26yc1nolXWDZqwpmBU3q3uief7L0&usqp=CAc"/>
                            
                        </Slider> 
                        </div>
                    </div>
             
            
            
            
            
         );
    }
}
 
export default ProductSlider;