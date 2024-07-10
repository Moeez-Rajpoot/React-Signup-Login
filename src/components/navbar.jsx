import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/LeafLogo.png";
import UserImage from "../assets/user.jpg"; // Assuming you have a user image in your assets
import { useNavigate } from "react-router-dom";

const Navbar = ({ OnLogOut ,setUserData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setUserData({});
    OnLogOut();
    navigate("/");
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "text-white font-roboto hover:bg-gray-700 p-5 rounded bg-gray-700"
      : "text-white font-roboto hover:bg-gray-700 p-5 rounded";

  return (
    <>
      <nav
        id="navbar"
        className="bg-[#01bf95] p-4 fixed top-0 w-full z-10 flex items-center justify-between"
      >
        <img id="Logo" src={Logo} alt="Company Logo" className="h-12 w-12 ml-3" />
        <button
          className="hamburger block md:hidden px-3 py-2 rounded text-white"
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          &#9776;
        </button>

        <div className="flex items-center">
          <div
            className={`menu ${
              isOpen ? "flex" : "hidden"
            } md:flex items-center justify-end flex-col md:flex-row`}
            style={{ zIndex: 9 }}
          >
            <ul className="flex flex-col md:flex-row list-none">
              <li className="mb-7 mt-2 md:mb-0 md:mr-9">
                <NavLink to="/Users" className={getNavLinkClass}>
                  All Users <i className="fa-solid fa-users"></i>
                </NavLink>
              </li>
              <li className="mb-7 mt-8 md:mb-0 md:mt-2 md:mr-9">
                <NavLink to="/dashboard" className={getNavLinkClass}>
                  Add Course <i className="fa-solid fa-plus"></i>
                </NavLink>
              </li>
              <li className="mb-7 mt-2 md:mb-0 md:mr-9">
                <NavLink to="/Course" className={getNavLinkClass}>
                  Courses <i className="fa-brands fa-discourse"></i>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="relative">
            <img
              src={UserImage}
              alt="User"
              className="h-9 w-9 rounded-full cursor-pointer"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            />
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </NavLink>
                <a
                  href="/"
                  onClick={handleLogOut}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Log Out
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;