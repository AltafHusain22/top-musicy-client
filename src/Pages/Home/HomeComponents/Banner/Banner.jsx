/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../../../../public/Assets/Banner/1.jpg";
import img2 from "../../../../../public/Assets/Banner/2.jpg";
import img3 from "../../../../../public/Assets/Banner/3.jpg";
import img4 from "../../../../../public/Assets/Banner/4.jpg";
import "./Banner.css";

const Banner = () => {
  return (
    <Carousel className="mx-auto text-center">
      <div className="relative h-[700px]">
        <img className="" src={img1} />
        <div className="banner-wrap">
          <div>
            <p className="banner-heading">
              Learn The
              <span className=" Segoe UI Symbol text-[#FF7703]">Music</span>{" "}
              <br /> <span className="leading-10">From The Masters</span>
            </p>
            <p className="banner-sub-title">
              Learn the Music From the Masters is a captivating educational
              program that offers a unique opportunity to delve into the world
              of classical music{" "}
            </p>
            <div className="btn-wrap">
              <button className="banner-btn">Learn More</button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[700px]">
        <img src={img2} />
        <div className="banner-wrap">
          <div>
            <p className="banner-heading">
              Learn The
              <span className=" Segoe UI Symbol text-[#FF7703]">Music</span>{" "}
              <br /> <span className="leading-10">From The Masters</span>
            </p>
            <p className="banner-sub-title">
              Learn the Music From the Masters is a captivating educational
              program that offers a unique opportunity to delve into the world
              of classical music{" "}
            </p>
            <div className="btn-wrap">
              <button className="banner-btn">Learn More</button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[700px]">
        <img src={img3} />
        <div className="banner-wrap">
          <div>
            <p className="banner-heading">
              Learn The
              <span className=" Segoe UI Symbol text-[#FF7703]">Music</span>{" "}
              <br /> <span className="leading-10">From The Masters</span>
            </p>
            <p className="banner-sub-title">
              Learn the Music From the Masters is a captivating educational
              program that offers a unique opportunity to delve into the world
              of classical music{" "}
            </p>
            <div className="btn-wrap">
              <button className="banner-btn">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
