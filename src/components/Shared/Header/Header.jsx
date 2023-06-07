/* eslint-disable no-unused-vars */
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { FiShoppingCart } from 'react-icons/fi';
import logo from '../../../../public/Assets/logo/logo.png'
const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire("Good job!", "Successfully LogOut !", "success");
      })
      .catch((error) => {});
  };

  const menuItems = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>

      <li>
        <Link to={"/instructors"}>Instructors</Link>
      </li>

      <li>
        <Link to={"/classes"}>Classes</Link>
      </li>

      <li>
        <Link to={"/dashboard"}>Dashboard</Link>
      </li>
     
    
    </>
  );
  return (
    <nav className=" ">
      <div className="navbar px-10 md:py-5 fixed z-10 bg-opacity-0 text-slate-200 bg-black max-w-screen-2xl mx-auto font-semibold text-xl ">
        <div className="navbar-start ">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems}
            </ul>
          </div>
          <a className=" text-2xl font-bold flex items-center justify-center">
            <span className="mb-2">Top</span><img className="w-[100px]" src={logo} alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <p>{user.displayName}</p>

              <button
                onClick={handleLogOut}
                className="btn btn-outline text-white mr-5"
              >
                LogOut
              </button>
            </>
          ) : (
            <Link to={"/login"}>
              <button className="btn btn-outline text-white mr-5">Login</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
