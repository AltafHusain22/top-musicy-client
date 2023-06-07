/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/shared/Header/Header";
import Footer from "../components/shared/Footer/Footer";

const Main = () => {
  const location = useLocation()
  const noHeaderFooter = location.pathname.includes('register') || location.pathname.includes('login')
  return (
    <div>
      { noHeaderFooter ||
        <Header></Header>
      }
       <Outlet></Outlet>
      {
      noHeaderFooter || <Footer></Footer>
      }
    </div>
  );
};

export default Main;
