/* eslint-disable no-unused-vars */
import React from "react";
import Banner from "./HomeComponents/Banner/Banner";
import { Helmet } from "react-helmet-async";
import TopClasses from "./HomeComponents/TopClasses/TopClasses";
import OurInstructors from "./HomeComponents/OurInstructors/OurInstructors";
import AboutUs from "./HomeComponents/AboutUs/AboutUs";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Top Musicy| Home</title>
      </Helmet>
      
      <Banner></Banner>
      <AboutUs></AboutUs>
      <TopClasses></TopClasses>
      <OurInstructors></OurInstructors>
      
     
    </div>
  );
};

export default Home;
