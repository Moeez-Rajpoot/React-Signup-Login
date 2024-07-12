import React, { useState, useEffect } from "react";
// import { useUser } from '../Context/UserContext';
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from '../Redux/Reducers/UserData';
import { enqueueSnackbar } from "notistack";
import Navbar from "./navbar";

const Profile = () => {
  // const { userdata, setUserData } = useUser();
  const dispatch = useDispatch()
  const userdata = useSelector((state) => state.UserData.userData);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Male");

  useEffect(() => {
    if (userdata) {
      setUsername(userdata.username || "");
      setEmail(userdata.email || "");
      setPhone(userdata.phone || "");
      setCnic(userdata.cnic || "");
      setDateOfBirth(userdata.dateOfBirth || "");
      setGender(userdata.gender || "Male");
    }
  }, [userdata]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = {
      username,
      email,
      phone,
      cnic,
      dateOfBirth,
      gender,
    };

    const credentialsArray = JSON.parse(localStorage.getItem("signupCredentials")) || [];
    const credentialMatch = credentialsArray.find((cred) => cred.username === userdata.username);
    if (credentialMatch) {
      credentialMatch.username = updatedUser.username;
      credentialMatch.email = updatedUser.email;
      credentialMatch.phone = updatedUser.phone;
      credentialMatch.cnic = updatedUser.cnic;
      credentialMatch.dateOfBirth = updatedUser.dateOfBirth;
      credentialMatch.gender = updatedUser.gender;
      localStorage.setItem("signupCredentials", JSON.stringify(credentialsArray));
    }
    dispatch(setUserData(updatedUser));
    enqueueSnackbar("Profile updated successfully", { variant: "success" });
  };

  return (
    <>
      <Navbar />
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