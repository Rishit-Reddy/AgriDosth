import { useEffect } from 'react';
import '../../assets/css/Carousel.css';

import carousel_image1 from '../../assets/img1.jpg';
import carousel_image2 from '../../assets/img2.jpg';

const images = [carousel_image1, carousel_image2];

const CarouselComponent = () => {
    useEffect(() => {
        let currentIndex = 0;
        const slides: NodeListOf<HTMLElement> = document.querySelectorAll('.carousel-slide');
        
        const showSlide = (index: number) => {
            slides.forEach((slide: HTMLElement, i: number) => {
              slide.style.opacity = i === index ? '1' : '0';
            });
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        };

        const interval = setInterval(nextSlide, 5000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="carousel">
            {images.map((image, index) => (
                <div key={index} className="carousel-slide">
                    <img src={image} alt={`Banner ${index + 1}`} />
                </div>
            ))}
        </div>
    );
}

export default CarouselComponent;
