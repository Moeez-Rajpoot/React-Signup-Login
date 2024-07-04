import { useState } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";

function signUp() {
  const [isSignUp, setIsSignUp] = useState("true"); // Assuming you have a state to toggle sign up
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorno, setErrorNo] = useState("");
  const [msgcolor, setmsgcolor] = useState("1");
  const handleSubmit = (event) => {
    event.preventDefault();

    const credentials = {
      username: username,
      password: password,
      email: email,
      phone: phone,
      cnic: Cnic,
      dateOfBirth: DateofBirth,
      gender: Gender,
    };

    let existingCredentials = JSON.parse(
      localStorage.getItem("signupCredentials")
    );
    if (!Array.isArray(existingCredentials)) {
      existingCredentials = [];
    }
    existingCredentials.push(credentials);
    localStorage.setItem(
      "signupCredentials",
      JSON.stringify(existingCredentials)
    );
  };

  const handleCnicCheck = (e) => {
    setErrorNo(4);
    let cnic = e.target.value;
    if (cnic.length === 0) {
      setErrorMessage("CNIC cannot be empty.");
      setShowError(true);
      return false;
    } else {
      setShowError(false);
    }
    if (cnic.length !== 15) {
      setShowError(true);
      setErrorMessage("CNIC must be 15 digits long.");
      return false;
    } else {
      setShowError(false);
    }
  };

  const handleUsernameCheck = (e) => {
    setErrorNo(1);
    const username = e.target.value.trim();
    if (username.length === 0) {
      setErrorMessage("Username cannot be empty.");
      setShowError(true);
      return;
    } else if (!isNaN(username)) {
      setErrorMessage(
        "Username must include alphabets and cannot be only numbers."
      );
      setShowError(true);
      return;
    } else {
      setShowError(false);
    }
  };

  const handlePasswordCheck = (e) => {
    setErrorNo(2);
    const password = e.target.value;
    if (password.length === 0) {
      setShowError(true);
      setErrorMessage("Password can't be empty.");
      return false;
    }
    if (password.length <= 8) {
      console.log("Password is weak");
      setShowError(true);
      setmsgcolor(1);
      setErrorMessage("Password is weak");
      return false;
    } else if (password.length > 8 && password.length <= 12) {
      setShowError(true);
      setmsgcolor(2);
      setErrorMessage("Password is moderate");
    } else {
      setShowError(true);
      setmsgcolor(3);
      setErrorMessage("Password is strong");
    }
  };

  const handlePhoneCheck = (e) => {
    setErrorNo(3);

    let phoneNumber = e.target.value;
    let phoneRegex = /^\+923\d{9}$/;
    if (phoneNumber.length === 0) {
      setShowError(true);
      setErrorMessage("Phone number cannot be empty.");
      return false;
    } else {
      setShowError(false);
    }
    if (!phoneRegex.test(phoneNumber)) {
      setShowError(true);
      setErrorMessage("Phone number must be in the format +923xxxxxxxxx");
      return false;
    } else {
      setShowError(false);
    }
  };

  return (
    <>
      <div className=" flex justify-center items-center bg-no-repeat bg-cover h-screen w-full bg-black">
        <div
          className={
            isSignUp
              ? "w-[25%] h-[90%] bg-no-repeat bg-cover flex justify-center items-center text-4xl text-white font-extrabold bg-[#01bf95] rounded-tl-lg rounded-bl-lg"
              : "w-[35%] h-[90%] bg-no-repeat bg-cover flex justify-center items-center text-4xl text-white font-extrabold bg-[#01bf95] rounded-tl-lg rounded-bl-lg"
          }
        >
          <div className="flex flex-col justify-center items-center px-7 py-7">
            <h1 className="text-3xl font-extrabold mb-4">Welcome Back !</h1>
            <p className="text-lg font-light text-center">
              {isSignUp
                ? "We are happy to have you here to keep connected with us please login with your personal info"
                : "If you are new and wanted to start a new journey please register with us."}
            </p>
            <button
              className="rounded-full border-2 border-white px-[50px] py-[12px] mt-5 text-xs font-roboto hover:bg-white hover:text-black hover:border-[#01bf95] transition duration-300 ease-in-out cursor-pointer"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>

        <div
          className={
            isSignUp
              ? "bg-white p-5 w-[45%] h-[90%] flex flex-col justify-center items-center border border-black border-opacity-20 m-0 rounded-tr-lg rounded-br-lg"
              : "bg-white p-5 w-[35%] h-[90%] flex flex-col justify-center items-center border border-black border-opacity-20 m-0 rounded-tr-lg rounded-br-lg"
          }
        >
          <h1
            className={
              isSignUp
                ? "font-extrabold text-[#01bf95] text-3xl font-roboto mt-8"
                : "font-extrabold text-[#01bf95] text-3xl font-roboto mt-[20%]"
            }
          >
            {isSignUp ? "Create New Account" : "Login To Explore"}
          </h1>
          <form
            className={
              isSignUp
                ? "w-full h-full flex flex-col justify-center items-center"
                : "w-full h-[50%] flex flex-col justify-center items-center "
            }
            onSubmit={handleSubmit}
          >
            {isSignUp ? (
              <div className="custom-input-field">
                <FontAwesomeIcon icon={faUser} className="ml-2" />
                <input
                  onChange={handleUsernameCheck}
                  placeholder="Username"
                  type="text"
                  id="Username"
                  name="Username"
                  required
                />
              </div>
            ) : null}
            {showError && errorno === 1 && (
              <p className="text-red-500 text-xs text-left pl-[2px] mb-2 w-[70%]">
                {errorMessage}
              </p>
            )}

            <div className="custom-input-field">
              <FontAwesomeIcon icon={faEnvelope} className="ml-2" />
              <input
                placeholder="Email"
                type="email"
                id="Email"
                name="Email"
                required
              />
            </div>

            <div className="custom-input-field">
              <FontAwesomeIcon icon={faKey} className="ml-2" />
              <input
                onChange={handlePasswordCheck}
                placeholder="Password"
                type="password"
                id="Password"
                name="Password"
                required
              />
            </div>

            {showError && errorno === 2 && (
              <p
                className={
                  msgcolor === 1
                    ? "text-red-500 text-xs text-left pl-[2px] mb-2 w-[70%]"
                    : msgcolor === 2
                    ? "text-orange-500 text-xs text-left pl-[2px] mb-2 w-[70%]"
                    : "text-green-500 text-xs text-left pl-[2px] mb-2 w-[70%]"
                }
              >
                {errorMessage}
              </p>
            )}

            {isSignUp ? (
              <div className="custom-input-field">
                <FontAwesomeIcon icon={faPhone} className="ml-2" />
                <input
                  onChange={handlePhoneCheck}
                  placeholder="Phone No"
                  type="tel"
                  id="Phone"
                  name="Phone"
                  required
                />
              </div>
            ) : null}
            {showError && errorno === 3 && (
              <p className="text-red-500 text-xs text-left pl-[2px] mb-2 w-[70%]">
                {errorMessage}
              </p>
            )}

            {isSignUp ? (
              <div className="custom-input-field">
                <FontAwesomeIcon icon={faIdCard} className="ml-2" />
                <input
                  onChange={handleCnicCheck}
                  placeholder="CNIC"
                  type="number"
                  id="Cnic"
                  name="Cnic"
                  required
                />
              </div>
            ) : null}
            {showError && errorno === 4 && (
              <p className="text-red-500 text-xs text-left pl-[2px] mb-2 w-[70%]">
                {errorMessage}
              </p>
            )}

            {isSignUp ? (
              <div className="custom-input-field">
                <label
                  className="text-nowrap pl-2 font-semibold"
                  htmlFor="Date"
                >
                  Date of Birth:
                </label>
                <input type="date" id="Date" name="Date" required />
                <br />
              </div>
            ) : null}

            {isSignUp ? (
              <div className="custom-input-field flex ml-1 gap-1 mt-3 mb-2.5 w-[70%] rounded-md font-sans">
                <label
                  className="text-nowrap pl-2 font-semibold flex mb-2"
                  htmlFor="Gender"
                >
                  Select Gender:
                </label>
                <select
                  id="Gender"
                  className="w-4/5 p-2 rounded border border-gray-300 text-base"
                  name="Gender"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            ) : null}
            <button
              className={
                isSignUp
                  ? "rounded-full border-2 text-white font-semibold border-[#0000004a] bg-[#01bf95] px-[50px] py-[12px] mt-5 text-xs font-roboto hover:bg-white hover:text-black hover:border-black transition duration-300 ease-in-out cursor-pointer"
                  : "rounded-full border-2 text-white font-semibold border-[#0000004a] bg-[#01bf95] px-[50px] py-[12px] mt-5 text-xs font-roboto hover:bg-white hover:text-black hover:border-black transition duration-300 ease-in-out cursor-pointer"
              }
              type="submit"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default signUp;
