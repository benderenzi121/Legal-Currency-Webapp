import React from 'react';
import '../styles/slider.css';
class Slider extends React.Component {
    state = {  }
    render() { 
        return ( 
            
            
               <div id="carouselExampleFade " class="carousel carousel-fade slider" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100 slider-img" src="https://pbs.twimg.com/media/EWNRHGuX0AERfhW.jpg" alt="First slide"/>
                        <div class="carousel-caption d-none d-md-block">
                            <h5 class = 'slider-caption-title'>Dragon shield</h5>
                            <p class = 'slider-caption-desc'>Protect your cards</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block slider-img" src="https://www.atlantis-comics.com/wp-content/uploads/2019/02/ddlttkmuaaalbxo_1.jpg" alt="Second slide"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block slider-img" src="https://pbs.twimg.com/media/EWNRHGuX0AERfhW.jpg" alt="Third slide"/>
                    </div>
                </div>
                        <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                    <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            
         );
    }
}
 
export default Slider;