/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Classess from "../Pages/Classes/Classess";
import Instructors from "../Pages/Insructors/Instructors";
import Dashboard from "../Layout/Dashboard";
import ManageClasses from "../Dashboard/Admin/ManageClasses/ManageClasses";
import ManageUsers from "../Dashboard/Admin/ManageUsers/ManageUsers";
import AdminHome from "../Dashboard/Admin/AdminHome/AdminHome";
import AddAClass from "../Dashboard/Instructors/AddClass/AddAClass";
import MyClassess from "../Dashboard/Instructors/MyClassess/MyClassess";


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
        path: "/instructors",
        element: <Instructors></Instructors>,
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

  // dashboard
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
    
                  // Admin routes //
      //  --------------------------------------//
      {
        path: "adminhome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "manageclasses",
        element: <ManageClasses></ManageClasses>,
      },
      {
        path: "mangeusers",
        element: <ManageUsers></ManageUsers>,
      },
             // instructor routes //
      //  --------------------------------------//
      {
        path: "instructorhome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "addclass",
        element: <AddAClass></AddAClass>,
      },
      {
        path: "myclassess",
        element: <MyClassess></MyClassess>,
      },
  

    ],
  },

]);
