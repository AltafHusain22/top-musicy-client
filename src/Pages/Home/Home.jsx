/* eslint-disable no-unused-vars */
import React from "react";
import Banner from "./HomeComponents/Banner/Banner";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Top Musicy| Home</title>
      </Helmet>
      
      <Banner></Banner>

    </div>
  );
};

export default Home;
