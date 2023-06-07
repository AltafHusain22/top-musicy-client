/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/shared/Header/Header";
import Footer from "../components/shared/Footer/Footer";

const Main = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
