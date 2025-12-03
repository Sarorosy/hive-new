import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useOutletContext } from "react-router-dom";

import "swiper/css";
import "swiper/css/autoplay";

import "./ecoher.css";

const ecoImages = [
  '/imagecompressor/5.jpg',
  '/imagecompressor/6.jpg',
  '/imagecompressor/10.jpg',
  '/imagecompressor/11.jpg',
  '/imagecompressor/12.jpg',
  '/imagecompressor/14.jpg',
  '/imagecompressor/21.png',
  '/imagecompressor/177.jpg',
];

export default function EcoHero() {

  const { theme } = useOutletContext();

  return (
    <div
      className={`
        eco-hero w-full 
        ${theme === "dark" ? "bg-black" : "bg-white"}
      `}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ${theme == "dark" ? "bg-black" : "bg-white"}`}>

        <Swiper
          spaceBetween={10}
          slidesPerView={4}
          modules={[Autoplay]}
          autoplay={{ delay: 1200 }}
          loop={true}
          className="eco-swiper"
        >
          {ecoImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`eco slide ${index + 1}`}
                className={`
                  eco-img
                  ${theme === "dark" ? "brightness-75" : "brightness-100"}
                `}
              />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
}
