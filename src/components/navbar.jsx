import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/LeafLogo.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ OnLogOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    OnLogOut(false);
    navigate("/");
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "text-white font-roboto hover:bg-gray-700 p-5 rounded bg-gray-700"
      : "text-white font-roboto hover:bg-gray-700 p-5 rounded";

  return (
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
      <div
        className={`menu ${
          isOpen ? "flex" : "hidden"
        } md:flex items-center justify-between flex-col md:flex-row`}
      >
        <ul className="flex flex-col md:flex-row list-none ml-auto">
          <li className="mb-2 md:mb-0 mr-6">
            <NavLink to="/dashboard" className={getNavLinkClass}>
              Add Course <i className="fa-solid fa-plus"></i>
            </NavLink>
          </li>
          <li className="mb-2 md:mb-0 mr-6">
            <NavLink to="/Users" className={getNavLinkClass}>
              All Users <i className="fa-solid fa-users"></i>
            </NavLink>
          </li>
          <li className="mb-2 md:mb-0 mr-6">
            <NavLink to="/Course" className={getNavLinkClass}>
              Courses <i className="fa-brands fa-discourse"></i>
            </NavLink>
          </li>
          <li className="mb-2 md:mb-0 mr-6">
            <NavLink onClick={handleLogOut} to="/" className={getNavLinkClass}>
              Log Out <i className="fa-solid fa-right-to-bracket"></i>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
