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
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/Reducers/UserData";
import { LoginState } from "../Redux/Reducers/Loginstate";

// import { useUser } from '../Context/UserContext';

function signUp() {
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
  const [image, setImage] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [reTypePassword, setretypePassword] = useState("");
  const dispatch = useDispatch();
  // const { setUserData } = useUser();
  const { enqueueSnackbar } = useSnackbar();

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    if (image) {
      const formData = new FormData();
      const blob = new Blob([image], { type: 'image/jpeg' });
      formData.append('image', blob, image.name);
  
      console.log("Image phase 1:", blob);
  
      try {
        const response = await fetch('http://127.0.0.1:3000/api/user/uploadimage', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.message}`);
        }
  
        const data = await response.json();
        setIpfsHash("https://salmon-tremendous-pike-190.mypinata.cloud/ipfs/"+data.ipfsHashes);
        enqueueSnackbar("Image uploaded successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } catch (error) {
        setShowError(true);
        setErrorNo(20);
        setErrorMessage('Failed to upload image to IPFS');
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate all fields before proceeding
    if (!validateFields()) {
      return;
    }

    const credentials = {
      Username: username,
      Password: password,
      Email: email,
      Phone: phone,
      Cnic: cnic,
      Dob: dateOfBirth,
      Gender: gender,
      IPFSUrl: ipfsHash,
    };

    console.log(credentials);

    try {
      const response = await fetch("http://127.0.0.1:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);

      // Clear form fields after successful submission
      setUsername("");
      setPassword("");
      setEmail("");
      setPhone("");
      setCnic("");
      setDateOfBirth("");
      setGender("");
      setIpfsHash("");

      setErrorMessage("");
      setShowError(false);
      setErrorNo("");

      enqueueSnackbar("User Registered Successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });

      setIsSignUp(!isSignUp);
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar("Registration Failed", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }

    // Commented out the local storage logic
    // let existingCredentials = JSON.parse(localStorage.getItem("signupCredentials")) || [];
    // existingCredentials.push(credentials);
    // localStorage.setItem("signupCredentials", JSON.stringify(existingCredentials));
  };

  const validateFields = () => {
    let isValid = true;

    if (username.trim().length === 0) {
      setErrorMessage("Username cannot be empty.");
      setShowError(true);
      setErrorNo(1);
      isValid = false;
    } else if (!isNaN(username.trim())) {
      setErrorMessage(
        "Username must include alphabets and cannot be only numbers."
      );
      setShowError(true);
      setErrorNo(1);
      isValid = false;
    }

    if (password.length === 0) {
      setErrorMessage("Password can't be empty.");
      setShowError(true);
      setErrorNo(2);
      isValid = false;
    } else if (password.length <= 8) {
      setErrorMessage("Password is weak");
      setShowError(true);
      setmsgcolor(1);
      setErrorNo(2);
      isValid = false;
    }

    let phoneRegex = /^\+923\d{9}$/;
    if (phone.length === 0) {
      setErrorMessage("Phone number cannot be empty.");
      setShowError(true);
      setErrorNo(3);
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      setErrorMessage("Phone number must be in the format +923xxxxxxxxx");
      setShowError(true);
      setErrorNo(3);
      isValid = false;
    }

    if (cnic.length === 0) {
      setErrorMessage("CNIC cannot be empty.");
      setShowError(true);
      setErrorNo(4);
      isValid = false;
    } else if (cnic.length !== 15) {
      setErrorMessage("CNIC must be 15 digits long.");
      setShowError(true);
      setErrorNo(4);
      isValid = false;
    }

    // Add more validations as needed

    return isValid;
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

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   const credentialsArray =
  //     JSON.parse(localStorage.getItem("signupCredentials")) || [];
  //   const credentialMatch = credentialsArray.find(
  //     (cred) =>
  //       cred.email.toLowerCase() === email.toLowerCase() &&
  //       cred.password === password
  //   );

  //   if (credentialMatch) {
  //     console.log("Credenitails  are " + JSON.stringify(credentialMatch));
  //     dispatch(setUserData(credentialMatch));
  //     // setUserData(credentialMatch);
  //     // onChangeUser(true);  //Use Context Api
  //     dispatch(LoginState());

  //     enqueueSnackbar("User Login Sucessfully", {
  //       variant: "success",
  //       anchorOrigin: {
  //         vertical: "bottom",
  //         horizontal: "right",
  //       },
  //     });
  //     navigate("/Users");
  //   } else {
  //     setShowError(true);
  //     setErrorNo(5);
  //     setErrorMessage("Invalid email or password");
  //   }

  //   setEmail("");
  //   setPassword("");
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      Email: email,
      Password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);

      if (data) {
        console.log("Credentials are " + JSON.stringify(data));
        dispatch(setUserData(data));
        dispatch(LoginState());

        // Store the access token in local storage or session storage
        localStorage.setItem("accessToken", data.accessToken);

        enqueueSnackbar("User Login Successfully", {
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
    } catch (error) {
      console.error("Error:", error);
      setShowError(true);
      setErrorNo(5);
      setErrorMessage(error.message || "Invalid email or password");
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
              ? "w-full  rounded-tl-none rounded-bl-none sm:w-1/4 sm:h-[87%] bg-no-repeat bg-cover flex justify-center items-center text-4xl text-white font-extrabold bg-[#01bf95] sm:rounded-tl-lg sm:rounded-bl-lg"
              : "w-full h-fit rounded-tl-none rounded-bl-none sm:w-1/3 sm:h-[83.33%] bg-no-repeat bg-cover flex justify-center items-center text-4xl text-white font-extrabold bg-[#01bf95] sm:rounded-tl-lg sm:rounded-bl-lg"
          }
        >
          <div className="h-full sm: flex flex-col justify-center items-center px-7 py-7">
            <h1
              className={
                isSignUp
                  ? " mt-48 sm:mt-0 text-3xl font-extrabold mb-2 md:text-center "
                  : "text-3xl font-extrabold mb-2 md:text-center"
              }
            >
              Welcome Back!
            </h1>
            <p className="text-lg font-light text-center md:text-base lg:text-2xl">
              {isSignUp
                ? "We are happy to have you here. To keep connected with us please login with your personal info."
                : "If you are new and want to start a new journey, please register with us."}
            </p>
            <button
              className="rounded-full border-2 border-white px-12 py-3 mt-5 text-xs font-roboto hover:bg-white hover:text-black hover:border-[#01bf95] transition duration-300 ease-in-out cursor-pointer"
              onClick={() => {
                setUsername("");
                setPassword("");
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
              ? "w-full h-fit rounded-tr-none rounded-br-none bg-white p-5 sm:w-2/5 sm:h-[87%] flex flex-col justify-center items-center border border-black border-opacity-20 m-0 sm:rounded-tr-lg sm:rounded-br-lg"
              : "w-full rounded-tr-none rounded-br-none bg-white p-5 sm:w-1/3 h-5/6 flex flex-col justify-center items-center border border-black border-opacity-20 m-0 sm:rounded-tr-lg sm:rounded-br-lg"
          }
        >
          <h1
            className={
              isSignUp
                ? "mt-4 mb-5 font-extrabold text-[#01bf95] text-3xl font-roboto md:text-center md:text-xl lg:text-3xl "
                : "mt-0 mb-12 font-extrabold text-[#01bf95] text-3xl font-roboto md:text-center"
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
                : "w-full h-1/2 flex flex-col justify-center items-center"
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
          {isSignUp && !isReset && (
            <div className="custom-input-field">
            <FontAwesomeIcon icon={faIdCard} className="ml-2" />
            <input type="file" onChange={handleImageChange} required />
          </div>
          )}
     
            {isSignUp && (
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
            )}
            {showError && errorno === 1 && (
              <p className="text-red-500 text-xs text-left pl-0 sm:pl-5 mb-2 w-3/4">
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
                  id="RetypePassword"
                  name="RetypePassword"
                  required
                />
              </div>
            )}

            {showError && errorno === 2 && (
              <p
                className={
                  msgcolor === 1
                    ? "text-red-500 text-xs text-left pl-0 sm:pl-2 mb-2 w-3/4"
                    : msgcolor === 2
                    ? "text-orange-500 text-xs text-left pl-0 sm:pl-2 mb-2 w-3/4"
                    : "text-green-500 text-xs text-left pl-0 sm:pl-2 mb-2 w-3/4"
                }
              >
                {errorMessage}
              </p>
            )}

            {isSignUp && (
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
            )}
            {showError && errorno === 3 && (
              <p className="text-red-500 text-xs text-left pl-0 sm:pl-2 mb-2 w-3/4">
                {errorMessage}
              </p>
            )}

            {isSignUp && (
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
            )}
            {showError && errorno === 4 && (
              <p className="text-red-500 text-xs text-left pl-0 sm:pl-2 mb-2 w-3/4">
                {errorMessage}
              </p>
            )}

            {isSignUp && (
              <div className="custom-input-field">
                <label
                  className="text-nowrap pl-2 font-semibold"
                  htmlFor="Date"
                >
                  Date of Birth:
                </label>
                <input
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  value={dateOfBirth}
                  type="date"
                  id="Date"
                  name="Date"
                  required
                />
                <br />
              </div>
            )}

            {isSignUp && (
              <div className="custom-input-field flex ml-1 gap-1 mt-3 mb-2.5 w-3/4 rounded-md font-sans">
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
            )}

           
            

            <div className="flex justify-center items-center w-full">
              <p className="text-red-500 text-xs text-center pl-0 sm:pl-2 w-3/4">
                {showError && errorno === 5 && errorMessage}
              </p>
            </div>
            <button
              className="rounded-full border-2 text-white font-semibold border-[#0000004a] bg-[#01bf95] px-12 py-3 text-xs font-roboto hover:bg-white hover:text-black hover:border-black transition duration-300 ease-in-out cursor-pointer md:mt-0 lg:mt-2"
              type="submit"
            >
              {isReset ? "Reset Password" : isSignUp ? "Sign Up" : "Sign In"}
            </button>
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
