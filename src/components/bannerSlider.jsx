import React from 'react';

const BannerSlider = () => (
    <div id="carouselExampleFade " className="carousel carousel-fade slider" data-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img className="d-block w-100 slider-img" src="https://pbs.twimg.com/media/EWNRHGuX0AERfhW.jpg" alt="First slide"/>
                <div className="carousel-caption d-none d-md-block">
                    <h5 className = 'slider-caption-title'>Dragon shield</h5>
                    <p className = 'slider-caption-desc'>Protect your cards</p>
                </div>
            </div>
            <div className="carousel-item">
                <img className="d-block slider-img" src="https://www.atlantis-comics.com/wp-content/uploads/2019/02/ddlttkmuaaalbxo_1.jpg" alt="Second slide"/>
            </div>
            <div className="carousel-item">
                <img className="d-block slider-img" src="https://pbs.twimg.com/media/EWNRHGuX0AERfhW.jpg" alt="Third slide"/>
            </div>
        </div>

        <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
        </a>

        <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
        </a>
    </div>
);

export default BannerSlider;