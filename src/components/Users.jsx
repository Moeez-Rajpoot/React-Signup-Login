import React from 'react';
import Navbar from './navbar';

function Users() {
  
  const usersData = JSON.parse(localStorage.getItem('signupCredentials') || '[]');

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-5">All Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {usersData.length > 0 ? (
            usersData.map((user, index) => (
              <div key={index} className="border p-4 rounded-lg shadow">
                <h3 className="text-xl font-bold">{user.username}</h3> 
                <p>Email: {user.email}</p>
                <p>Username: {user.username}</p>
                <p>Phone: {user.phone}</p> 
                <p>CNIC: {user.cnic}</p>
                <p>Date of Birth: {user.dateOfBirth}</p>
                <p>Gender: {user.gender}</p>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Users;