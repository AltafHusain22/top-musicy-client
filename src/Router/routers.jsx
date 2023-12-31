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
import InstructorHome from "../Dashboard/Instructors/InstructorHome/InstructorHome";
import SelectedClasses from "../Dashboard/Student/SelectedClasses/SelectedClasses";
import EnrolledClasses from "../Dashboard/Student/EnrolledClasses/EnrolledClasses";
import PrivateRotes from "../PrivateRoute/PrivateRotes";
import Feedback from "../Dashboard/Admin/Feedback/Feedback";
import Payment from "../Dashboard/Student/Payment/Payment";
import PaymentHistry from "../Dashboard/Student/PaymentHistry/PaymentHistry";
import Error from "../Pages/404/Error";
import UpdateClass from "../Dashboard/Instructors/UpdateClass/UpdateClass";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
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
        element: <PrivateRotes><AdminHome></AdminHome></PrivateRotes>,
      },
      {
        path: "manageclasses",
        element: <PrivateRotes><ManageClasses></ManageClasses></PrivateRotes>,
      },
      {
        path: "mangeusers",
        element: <PrivateRotes><ManageUsers></ManageUsers></PrivateRotes>,
      },
      {
        path: "feedback",
        element: <PrivateRotes><Feedback></Feedback></PrivateRotes>,
      },
             // instructor routes //
      //  --------------------------------------//
      {
        path: "instructorhome",
        element: <InstructorHome></InstructorHome>,
      },
      {
        path: "addclass",
        element: <PrivateRotes><AddAClass></AddAClass></PrivateRotes>,
      },
      {
        path: "myclassess",
        element: <PrivateRotes><MyClassess></MyClassess></PrivateRotes>,
      },
      {
        path: "updateClass",
        element: <PrivateRotes><UpdateClass></UpdateClass></PrivateRotes>,
      },
  
             // students routes //
      //  --------------------------------------//
      {
        path: "selectedClasses",
        element: <PrivateRotes><SelectedClasses></SelectedClasses></PrivateRotes>,
      },
      {
        path: "enrolledClasses",
        element: <PrivateRotes><EnrolledClasses></EnrolledClasses></PrivateRotes>,
      },
      {
        path: "checkout",
        element: <PrivateRotes><Payment></Payment></PrivateRotes>,
      },
      {
        path: "paymenthistry",
        element: <PrivateRotes><PaymentHistry></PaymentHistry></PrivateRotes>,
      },
  

    ],
  },

]);
