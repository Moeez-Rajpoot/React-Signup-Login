import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/LeafLogo.png";
import UserImage from "../assets/user.jpg"; // Assuming you have a user image in your assets
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearUserData } from '../Redux/Reducers/UserData';
import { LogOutState } from '../Redux/Reducers/Loginstate';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(clearUserData());
    dispatch(LogOutState());
    navigate("/");
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "w-full text-center text-white font-roboto hover:bg-gray-700 p-5 rounded bg-gray-700"
      : "w-full text-center text-white font-roboto hover:bg-gray-700 p-5 rounded";

  return (
    <>
      <nav
        id="navbar"
        className="bg-[#01bf95] p-4 fixed top-0 w-full z-10 flex items-center justify-between shadow-md"
      >
        <img id="Logo" src={Logo} alt="Company Logo" className="h-12 w-12 ml-3" />
        <div className="flex items-center">
          <button
            className="hamburger block md:hidden px-3 py-2 rounded text-white"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            &#9776;
          </button>
          <div
            className={`menu ${
              isOpen ? "flex" : "hidden"
            } md:flex items-center justify-end flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-[#01bf96d6] md:bg-transparent`}
            style={{ zIndex: 9 }}
          >
            <ul className="flex flex-col md:flex-row list-none w-full md:w-auto">
              <li className="flex justify-center sm:mb-7 mt-2 md:mb-0 md:mr-9">
                <NavLink to="/Users" className={getNavLinkClass}>
                  All Users <i className="fa-solid fa-users"></i>
                </NavLink>
              </li>
              <li className="flex justify-center sm:mb-7 mt-2 md:mb-0 md:mt-2 md:mr-9">
                <NavLink to="/dashboard" className={getNavLinkClass}>
                  Add Course <i className="fa-solid fa-plus"></i>
                </NavLink>
              </li>
              <li className="flex justify-center sm:mb-7 mt-2 md:mb-0 md:mr-9">
                <NavLink to="/Course" className={getNavLinkClass}>
                  Courses <i className="fa-brands fa-discourse"></i>
                </NavLink>
              </li>
              <div className="relative flex justify-center mt-3 mb-2 sm:mt-5">
                <img
                  src={UserImage}
                  alt="User"
                  className=" h-9 w-9 rounded-full cursor-pointer"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                />
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                    <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </NavLink>
                    <a
                      onClick={handleLogOut}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Log Out
                    </a>
                  </div>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
