import React from "react";
import { CarouselProvider, Slider, Slide, Image } from "pure-react-carousel";

import city1 from "../../assets/city-1.jpg";
import city2 from "../../assets/city-2.jpg";
import city3 from "../../assets/city-3.jpg";
import photo1 from "../../assets/photo-1.jpg";

import "pure-react-carousel/dist/react-carousel.es.css";

const Carousel = () => (
    <CarouselProvider
        naturalSlideWidth={325}
        naturalSlideHeight={243}
        totalSlides={4}
        isPlaying={true}
        interval={3000}
        hasMasterSpinner={true}
    >
        <Slider>
            <Slide index={0}>
                <Image src={photo1} alt="" />
            </Slide>
            <Slide index={1}>
                <Image src={city1} alt="" />
            </Slide>
            <Slide index={2}>
                <Image src={city2} alt="" />
            </Slide>
            <Slide index={3}>
                <Image src={city3} alt="" />
            </Slide>
        </Slider>
    </CarouselProvider>
);

// <DotGroup className="homePage-carousel__dots" /> /* Todo */

export default Carousel;
