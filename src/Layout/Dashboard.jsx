/* eslint-disable no-unused-vars */
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Dashborad.css";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import { RxDividerHorizontal } from 'react-icons/rx';

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  return (
    <div className="flex">
      {/* Sidebar */}

      <div className="sidebar-wrap  ">
        {isAdmin && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Admin Dashboard
            </h2>
          </>
        )}

        {isInstructor && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Instructor Dashboard
            </h2>
          </>
        )}

        {!isInstructor && !isAdmin && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              User Dashboard
            </h2>
          </>
        )}

        <ul className="space-y-2">
          {isAdmin && (
            <>
              <li>
                <Link to={"/dashboard/adminhome"} className="item-text">
                  Admin Home
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/manageclasses"} className="item-text">
                  Manage Classes
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/mangeusers"} className="item-text">
                  Manage Users
                </Link>
              </li>

              <div className="my-5"><span className="divider w-full bg-white h-[2px]"></span>
              </div>

              <li>
                <Link to={"/"} className="item-text">
                  Home
                </Link>
              </li>
            </>
          )}
          {isInstructor && (
            <>
              <li>
                <Link to={"/dashboard/addclass"} className="item-text">
                  Add Class
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/myclassess"} className="item-text">
                  My Classes
                </Link>
              </li>

              <div className="my-5"><span className="divider w-full bg-white h-[2px]"></span>
              </div>

              <li>
                <Link to={"/"} className="item-text">
                  Home
                </Link>
              </li>
            </>
          )}
          {!isInstructor && !isAdmin && (
            <>
              <li className="">
                <Link to={"/dashboard/addclass"} className="item-text ">
                  User item 1
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/myclassess"} className="item-text">
                  user item 2
                </Link>
              </li>

              <div className="my-5"><span className="divider w-full bg-white h-[2px]"></span>
              </div>

              <li>
                <Link to={"/"} className="item-text">
                  Home
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="p-8 mx-auto w-11/12">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
