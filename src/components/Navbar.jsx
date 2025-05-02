import React, { useState } from "react";
import { close, logo, menu } from "./../assets";
import { navLinks } from "./../constants";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation(); // Get the current route

  return (
    <nav className="w-full py-6 flex justify-between items-center navbar relative z-[999]">
      <img src={logo} alt="Logo" className="w-[124px] h-[32px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => {
          // Normalize home route
          const path = nav.id === "/" ? "/" : `/${nav.id}`;
          const isActive = location.pathname === path;

          return (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-base ${
                isActive ? "text-[#FF4E50]" : "text-white hover:text-[#FF4E50]"
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            >
              <Link to={path}>{nav.title}</Link>
            </li>
          );
        })}

        <li className="font-poppins font-normal cursor-pointer text-base ml-2">
          <Link
            to="account/login"
            className={`border transition-all duration-300 border-[#FF4E50] px-5 py-3 rounded-md ${
              location.pathname === "/login"
                ? "bg-[#FF4E50] text-white"
                : "text-white hover:bg-[#FF4E50]"
            }`}
          >
            Login
          </Link>
        </li>
      </ul>

      <div className="sm:hidden flex justify-end items-center flex-1">
        <img
          src={toggle ? close : menu}
          alt="Menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle((prev) => !prev)}
        />

        <div
          className={`${
            toggle ? "flex" : "hidden"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex flex-col justify-end  flex-1">
            {navLinks.map((nav, index) => {
              const path = nav.id === "/" ? "/" : `/${nav.id}`;
              const isActive = location.pathname === path;

              return (
                <li
                  key={nav.id}
                  className={`font-poppins font-normal cursor-pointer text-base ${
                    isActive ? "text-[#FF4E50]" : "text-white"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                >
                  <Link to={path}>{nav.title}</Link>
                </li>
              );
            })}

            <li className="font-poppins font-normal cursor-pointer text-base mt-4">
              <Link
                to="account/login"
                className={`border transition-all duration-300 border-[#FF4E50] px-5 py-3 rounded-md ${
                  location.pathname === "/login"
                    ? "bg-[#FF4E50] text-white"
                    : "text-white hover:bg-[#FF4E50]"
                }`}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
