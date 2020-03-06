import React, {Component} from 'react';
import { Carousel } from 'react-bootstrap';

class CarouselBlock extends Component {
    render() {
        return (
            <div>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={window.location.origin + '/images/bird_silhouette_vector_134154_1920x1080.jpg'}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={window.location.origin + '/images/road_night_light_125999_1920x1080.jpg'}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={window.location.origin + '/images/thumb-1920-943148.jpg'}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

export default CarouselBlock;