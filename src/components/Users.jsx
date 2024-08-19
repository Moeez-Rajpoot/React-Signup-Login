import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Users() {
  const dispatch = useDispatch();
  const [CurrentUser, setCurrentUser] = useState([]);
  const IPFSUrl = useSelector((state) => state.UserProfile?.IPFSUrl || ""); // Provide a default value
  const accesstoken = useSelector(
    (state) => state.UserData.userData.accesstoken
  );
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        console.log("accesstoken:", accesstoken);
        const response = await fetch(
          "http://127.0.0.1:3000/api/user/Getallusers",
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );
        const data = await response.json();
        setUsersData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [accesstoken]);

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
        setCurrentUser(data);
        localStorage.setItem("Userdp", JSON.stringify(data.IPFSUrl));
        console.log("userdp : ", data.IPFSUrl);

      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, [accesstoken, dispatch]);

  const handleEdit = (user) => {
    // Implement edit functionality here
    console.log("Edit user:", user);
  };

  const handleDelete = (user) => {
    // Implement delete functionality here
    console.log("Delete user:", user);
  };

  return (
    <>
      <Navbar Profile={CurrentUser.IPFSUrl} />
      <div className="container mx-auto mt-24 sm:mt-28">
        <h2 className="flex justify-center text-2xl font-semibold mb-5">
          All Users
        </h2>
        {usersData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Username</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Phone</th>
                  <th className="py-2 px-4 border-b">CNIC</th>
                  <th className="py-2 px-4 border-b">ImgUrl</th>
                  <th className="py-2 px-4 border-b">Password</th>
                  <th className="py-2 px-4 border-b">Date of Birth</th>
                  <th className="py-2 px-4 border-b">Gender</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{user.Username}</td>
                    <td className="py-2 px-4 border-b">{user.Email}</td>
                    <td className="py-2 px-4 border-b">{user.Phone}</td>
                    <td className="py-2 px-4 border-b">{user.Cnic}</td>
                    <td className="py-2 px-4 border-b">
                      <div className="truncate max-w-xs" title={user.IPFSUrl}>
                        {user.IPFSUrl}
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="truncate max-w-xs" title={user.Password}>
                        {user.Password}
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {new Date(user.Dob).toLocaleDateString("en-GB")}
                    </td>
                    <td className="py-2 px-4 border-b">{user.Gender}</td>
                    <td className="py-2 px-4 border-b">
                      <button onClick={() => handleEdit(user)} className="mr-2">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button onClick={() => handleDelete(user)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">No users found.</p>
        )}
      </div>
    </>
  );
}

export default Users;