/* eslint-disable no-unused-vars */
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Dashborad.css";

const Dashboard = () => {
  const isAdmin = true;

  return (
    <div className="flex">
      {/* Sidebar */}

      <div className="sidebar-wrap">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-2">
          {isAdmin ? (
            <>
              <li>
                <Link to={"/dashboard/"} className="item-text">
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
            </>
          ) : (
            <>
              <li>
                <Link to={"/dashboard/manageclasses"} className="item-text">
                  {" "}
                  user menu
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
