import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from "notistack";
import Navbar from "./navbar";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [Currentuserdata, setCurrentUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Male");
  const accesstoken = useSelector(
    (state) => state.UserData.userData.accesstoken
  );

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("Userdp")));
  }, []); 

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        console.log("accesstoken:", accesstoken);
        const response = await fetch(
          "http://127.0.0.1:3000/api/user/current",
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );
        const data = await response.json();
        console.log("Current user  : ", data);
        setCurrentUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (accesstoken) {
      getCurrentUser();
    }
  }, [accesstoken, currentUser]);

  useEffect(() => {
    if (Currentuserdata) {
      setUsername(Currentuserdata.Username || "");
      setEmail(Currentuserdata.Email || "");
      setPhone(Currentuserdata.Phone || "");
      setCnic(Currentuserdata.Cnic || "");
      setDateOfBirth(Currentuserdata.Dob ? Currentuserdata.Dob.split("T")[0] : "");
      setGender(Currentuserdata.Gender || "Male");
    }
  }, [Currentuserdata]);

  const validateFields = () => {
    let isValid = true;

    if (username.trim().length === 0) {
      enqueueSnackbar("Username cannot be empty.", { variant: "error" });
      isValid = false;
    } else if (!isNaN(username.trim())) {
      enqueueSnackbar("Username must include alphabets and cannot be only numbers.", { variant: "error" });
      isValid = false;
    }

    let phoneRegex = /^\923\d{9}$/;
    if (phone.length === 0) {
      enqueueSnackbar("Phone number cannot be empty.", { variant: "error" });
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      enqueueSnackbar("Phone number must be in the format +923xxxxxxxxx", { variant: "error" });
      isValid = false;
    }

    if (cnic.length === 0) {
      enqueueSnackbar("CNIC cannot be empty.", { variant: "error" });
      isValid = false;
    } else if (cnic.toString().length !== 15) {
      enqueueSnackbar("CNIC must be 15 digits long.", { variant: "error" });
      isValid = false;
    }

    // Add more validations as needed

    return isValid;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return; // Prevent submission if fields are not valid
    }

    const updatedUser = {
      id: Currentuserdata.id,
      username,
      email,
      phone,
      cnic,
      dateOfBirth,
      gender,
    };

    try {
      const response = await fetch("http://127.0.0.1:3000/api/user/updatedata", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUserData(data);
        setUsername(data.Username || "");
        setEmail(data.Email || "");
        setPhone(data.Phone || "");
        setCnic(data.Cnic || "");
        setDateOfBirth(data.Dob ? data.Dob.split("T")[0] : "");
        setGender(data.Gender || "Male");

        enqueueSnackbar("Profile updated successfully", { variant: "success" });
      } else {
        enqueueSnackbar("Failed to update profile", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("An error occurred while updating profile", { variant: "error" });
    }
  };

  return (
    <>
      <Navbar Profile={currentUser} />
      <div className="mt-20 sm:mt-5 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-2xl font-roboto font-bold mb-6 text-gray-900 text-center">Profile</h1>
          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">CNIC</label>
              <input type="number" value={cnic} onChange={(e) => setCnic(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;