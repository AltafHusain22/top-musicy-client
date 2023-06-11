/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Dashborad.css";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import { MdClass, MdOutlineClass, MdPayment } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import useUser from "../hooks/useUser";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isInstructor, isInstructorLoading] = useInstructor();
  const [isUser, isUserLoading] = useUser();
  const { user ,loading } = useAuth();
 

  if (isInstructorLoading || isAdminLoading || isUserLoading || loading) {
    return (
      <div className="mt-20 flex justify-center">
        <div className=" mt-10 w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-800"></div>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}

      <div className="sidebar-wrap ">
        {isAdmin && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Admin Dashboard
            </h2>
            <div className="text-center">
            <div className="avatar">
              <div className="w-24 mask rounded-full">
                <img src={user?.photoURL} />
              </div>
            </div>
            <div className="my-5">
              <h2 className="text-white">Name : {user?.displayName}</h2>
              <h2 className="text-white">Email : {user?.email}</h2>
            </div>
          </div>
          </>
        )}

        {isInstructor && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Instructor Dashboard
            </h2>
            <div className="text-center">
            <div className="avatar">
              <div className="w-24 mask rounded-full">
                <img src={user?.photoURL} />
              </div>
            </div>
            <div className="my-5">
              <h2 className="text-white">Name : {user?.displayName}</h2>
              <h2 className="text-white">Email : {user?.email}</h2>
            </div>
          </div>
          </>
        )}

        {!isInstructor && !isAdmin && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Student Dashboard
            </h2>
            <div className="text-center">
            <div className="avatar">
              <div className="w-24 mask rounded-full">
                <img src={user?.photoURL} />
              </div>
            </div>
            <div className="my-5">
              <h2 className="text-white">Name : {user?.displayName}</h2>
              <h2 className="text-white">Email : {user?.email}</h2>
            </div>
          </div>
          </>
        )}

        <ul className="space-y-2">
          {isAdmin && (
            <>
              <li>
                <Link to={"/dashboard/adminhome"} className="item-text">
                  <AiOutlineHome className="text-xl"></AiOutlineHome> Admin Home
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/manageclasses"} className="item-text">
                  <MdClass className="text-xl"></MdClass> Manage Classes
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/mangeusers"} className="item-text">
                  <FiUsers></FiUsers> Manage Users
                </Link>
              </li>

              <div className="my-5">
                <span className="divider w-full bg-white h-[2px]"></span>
              </div>

              <li>
                <Link to={"/"} className="item-text">
                  <AiOutlineHome className="text-xl"></AiOutlineHome> Home
                </Link>
              </li>
            </>
          )}
          {isInstructor && (
            <>
              <li>
                <Link to={"/dashboard/addclass"} className="item-text">
                  <MdOutlineClass className="text-xl"></MdOutlineClass> Add
                  Class
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/myclassess"} className="item-text">
                  <MdClass className="text-xl"></MdClass> My Classes
                </Link>
              </li>

              <div className="my-5">
                <span className="divider w-full bg-white h-[2px]"></span>
              </div>

              <li>
                <Link to={"/"} className="item-text">
                  <AiOutlineHome className="text-xl"></AiOutlineHome> Home
                </Link>
              </li>
            </>
          )}
          {isUser && (
            <>
              <li className="">
                <Link to={"/dashboard/selectedClasses"} className="item-text ">
                  <MdOutlineClass className="text-xl"></MdOutlineClass> My
                  Selected Classes
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/enrolledClasses"} className="item-text">
                  <MdClass className="text-xl"></MdClass> My Enrolled Classes
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/paymenthistry"} className="item-text">
                  <MdPayment className="text-xl"></MdPayment> Payment Histry
                </Link>
              </li>

              <div className="my-5">
                <span className="divider w-full bg-white h-[2px]"></span>
              </div>

              <li>
                <Link to={"/"} className="item-text">
                  <AiOutlineHome className="text-xl"></AiOutlineHome> Home
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="p-8 mx-auto w-9/12">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
