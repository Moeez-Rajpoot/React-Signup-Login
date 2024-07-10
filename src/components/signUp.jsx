/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useUser } from '../Context/UserContext';

function signUp({ onChangeUser }) {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorno, setErrorNo] = useState("");
  const [msgcolor, setmsgcolor] = useState("1");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Male");
  const [isReset, setIsReset] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [reTypePassword, setretypePassword] = useState("");
  const { setUserData } = useUser();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (event) => {
    event.preventDefault();

    const credentials = {
      username,
      password,
      email,
      phone,
      cnic,
      dateOfBirth,
      gender,
    };

    console.log(credentials);

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

    setUsername("");
    setPassword("");
    setEmail("");
    setPhone("");
    setCnic("");
    setDateOfBirth("");
    setGender("");

       
    enqueueSnackbar("User Registered Sucessfully", {
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    console.log(event.target.value); 
  };

  const handleCnicCheck = (e) => {
    setCnic(e.target.value);
    const newcnic = e.target.value;
    setErrorNo(4);
    if (newcnic.length === 0) {
      setErrorMessage("CNIC cannot be empty.");
      setShowError(true);
      return false;
    } else {
      setShowError(false);
    }
    if (newcnic.length !== 15) {
      setShowError(true);
      setErrorMessage("CNIC must be 15 digits long.");
      return false;
    } else {
      setShowError(false);
    }
  };

  const handleUsernameCheck = (e) => {
    setErrorNo(1);
    setUsername(e.target.value.trim());
    const newUsername = e.target.value.trim();
    if (newUsername.length === 0) {
      setErrorMessage("Username cannot be empty.");
      setShowError(true);
      return;
    } else if (!isNaN(newUsername)) {
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
    setmsgcolor(1);
    setPassword(e.target.value);
    const newpassword = e.target.value;
    if (newpassword.length === 0) {
      setShowError(true);
      setErrorMessage("Password can't be empty.");
      return false;
    } else {
      setShowError(false);
    }
    if (newpassword.length <= 8) {
      console.log("Password is weak");
      setShowError(true);
      setmsgcolor(1);
      setErrorMessage("Password is weak");
      return false;
    } else if (newpassword.length > 8 && newpassword.length <= 12) {
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
    setPhone(e.target.value);
    const newphone = e.target.value;

    let phoneRegex = /^\+923\d{9}$/;
    if (newphone.length === 0) {
      setShowError(true);
      setErrorMessage("Phone number cannot be empty.");
      return false;
    } else {
      setShowError(false);
    }
    if (!phoneRegex.test(newphone)) {
      setShowError(true);
      setErrorMessage("Phone number must be in the format +923xxxxxxxxx");
      return false;
    } else {
      setShowError(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const credentialsArray =
      JSON.parse(localStorage.getItem("signupCredentials")) || [];
    const credentialMatch = credentialsArray.find(
      (cred) =>
        cred.email.toLowerCase() === email.toLowerCase() &&
        cred.password === password
    );

    if (credentialMatch) {
      console.log("Credenitails  are " + JSON.stringify(credentialMatch));
      setUserData(credentialMatch);
      onChangeUser(true);

      enqueueSnackbar("User Login Sucessfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      navigate("/Users");
    } else {
      setShowError(true);
      setErrorNo(5);
      setErrorMessage("Invalid email or password");
    }

    setEmail("");
    setPassword("");
  };

  const handleReset = (e) => {
    e.preventDefault();
    const credentialsArray =
      JSON.parse(localStorage.getItem("signupCredentials")) || [];
    const credentialMatch = credentialsArray.find(
      (cred) =>
        cred.username === username &&
        cred.email.toLowerCase() === email.toLowerCase() &&
        cred.phone === phone &&
        cred.cnic === cnic &&
        cred.dateOfBirth === dateOfBirth &&
        cred.gender === gender
    );

    if (credentialMatch) {
      setIsChangePassword(true);
      console.log("All credentials matched. Proceed to password change.");
      setIsSignUp(false);
      setErrorMessage("");
      setShowError(false);
      localStorage.setItem("resetUsername", username);
    } else {
      setShowError(true);
      setErrorNo(5);
      setErrorMessage("No matching credentials found.");
    }
  };

  const handleretypePasswordCheck = (e) => {
    setretypePassword(e.target.value);
    if (password === e.target.value) {
      setShowError(false);
    } else {
      setShowError(true);
      setErrorNo(5);
      setErrorMessage("Passwords do not match.");
      return false;
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const credentialsArray =
      JSON.parse(localStorage.getItem("signupCredentials")) || [];
    const credentialMatch = credentialsArray.find(
      (cred) => cred.username === localStorage.getItem("resetUsername")
    );
    if (password === reTypePassword) {
      credentialMatch.password = password;
      localStorage.setItem(
        "signupCredentials",
        JSON.stringify(credentialsArray)
      );
      setIsReset(false);
      setIsChangePassword(false);
      setUsername("");
      setPassword("");
      setEmail("");
      setPhone("");
      setCnic("");
      setDateOfBirth("");
      setGender("");
      setretypePassword("");
      setShowError(false);
      setErrorMessage("");
      enqueueSnackbar("Password Changed Sucessfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      navigate("/");
    } else {
      setShowError(true);
      setErrorNo(5);
      setErrorMessage("Passwords do not match.");
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center items-center bg-no-repeat bg-cover h-screen w-full bg-black">
        <div
          className={
            isSignUp
              ? "w-full sm:w-[25%] h-[90%] bg-no-repeat bg-cover flex justify-center items-center text-4xl text-white font-extrabold bg-[#01bf95] rounded-tl-lg rounded-bl-lg"
              : "w-full sm:w-[35%] h-[90%] bg-no-repeat bg-cover flex justify-center items-center text-4xl text-white font-extrabold bg-[#01bf95] rounded-tl-lg rounded-bl-lg"
          }
        >
          <div className=" flex flex-col justify-center items-center px-7 py-7">
            <h1 className="text-3xl font-extrabold mb-4">Welcome Back !</h1>
            <p className="text-lg font-light text-center">
              {isSignUp
                ? "We are happy to have you here to keep connected with us please login with your personal info"
                : "If you are new and wanted to start a new journey please register with us."}
            </p>
            <button
              className="rounded-full border-2 border-white px-[50px] py-[12px] mt-5 text-xs font-roboto hover:bg-white hover:text-black hover:border-[#01bf95] transition duration-300 ease-in-out cursor-pointer"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setIsReset(false);
                setIsChangePassword(false);
                setShowError(false);
                setErrorMessage("");
              }}
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
            {isReset
              ? "Reset Password"
              : isSignUp
              ? "Create New Account"
              : "Login To Explore"}
          </h1>
          <form
            className={
              isSignUp
                ? "w-full h-full flex flex-col justify-center items-center"
                : "w-full h-[50%] flex flex-col justify-center items-center "
            }
            onSubmit={
              isChangePassword
                ? handlePasswordChange
                : isReset
                ? handleReset
                : isSignUp
                ? handleSubmit
                : handleLogin
            }
          >
            {isSignUp ? (
              <div className="custom-input-field">
                <FontAwesomeIcon icon={faUser} className="ml-2" />
                <input
                  onChange={handleUsernameCheck}
                  value={username}
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

            {!isChangePassword && (
              <div className="custom-input-field">
                <FontAwesomeIcon icon={faEnvelope} className="ml-2" />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  value={email}
                  type="email"
                  id="Email"
                  name="Email"
                  required
                />
              </div>
            )}
            {!isReset && (
              <div className="custom-input-field">
                <FontAwesomeIcon icon={faKey} className="ml-2" />
                <input
                  onChange={(e) =>
                    isSignUp
                      ? handlePasswordCheck(e)
                      : setPassword(e.target.value)
                  }
                  value={password}
                  placeholder="Password"
                  type="password"
                  id="Password"
                  name="Password"
                  required
                />
              </div>
            )}

            {isChangePassword && (
              <div className="custom-input-field">
                <FontAwesomeIcon icon={faKey} className="ml-2" />
                <input
                  onChange={(e) =>
                    isSignUp
                      ? handlePasswordCheck(e)
                      : setPassword(e.target.value)
                  }
                  value={password}
                  placeholder="Password"
                  type="password"
                  id="RetypePassword"
                  name="RetypePassword"
                  required
                />
              </div>
            )}

            {isChangePassword && isReset && (
              <div className="custom-input-field">
                <FontAwesomeIcon icon={faKey} className="ml-2" />
                <input
                  onChange={
                    isSignUp
                      ? handleretypePasswordCheck
                      : (e) => setretypePassword(e.target.value)
                  }
                  value={reTypePassword}
                  placeholder="Retype Password"
                  type="password"
                  id="Retype Password"
                  name="Password"
                  required
                />
              </div>
            )}

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
                  value={phone}
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
                  value={cnic}
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
                <input
                  onChange={(e) => {
                    setDateOfBirth(e.target.value);
                  }}
                  value={dateOfBirth}
                  type="date"
                  id="Date"
                  name="Date"
                  required
                />
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
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            ) : null}

            <div className="flex justify-center items-center w-full">
              <p className="text-red-500 text-xs text-center pl-[2px] w-[70%]">
                {showError && errorno === 5 && errorMessage}
              </p>
            </div>
            <button
              className={
                isSignUp
                  ? "rounded-full border-2 text-white font-semibold border-[#0000004a] bg-[#01bf95] px-[50px] py-[12px] mt-5 text-xs font-roboto hover:bg-white hover:text-black hover:border-black transition duration-300 ease-in-out cursor-pointer"
                  : "rounded-full border-2 text-white font-semibold border-[#0000004a] bg-[#01bf95] px-[50px] py-[12px] mt-5 text-xs font-roboto hover:bg-white hover:text-black hover:border-black transition duration-300 ease-in-out cursor-pointer"
              }
              type="submit"
            >
              {isReset ? "Reset Password" : isSignUp ? "Sign Up" : "Sign In"}
            </button>
            {/* Forget Password Link */}
            {!isSignUp && !isReset && (
              <div className="flex justify-center items-center w-full mt-2">
                <a
                  onClick={() => {
                    setIsSignUp(true);
                    setIsReset(true);
                  }}
                  className="text-xs text-[#01bf95] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default signUp;
