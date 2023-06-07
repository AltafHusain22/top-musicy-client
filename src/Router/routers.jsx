/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Classess from "../Pages/Classes/Classess";
import Dashboard from "../Dashboard/Dashboard";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/classes",
        element: <Classess></Classess>,
      },
   
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },

    ],
  },
  {
   path: '/dashboard',
   element: <Dashboard></Dashboard>,
    children: [
 
    ],
  },
]);
