import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './navbar'; 
import Courses from './Course'; 
import Users from './Users'; 
import { useUser } from '../Context/UserContext';
function Dashboard() {

  const { logout , setUserData } = useUser();

  return (
    <div>
      <Navbar OnLogOut={logout} />

      <div className="bg-black w-screen h-screen">

      </div>
    </div>
  );
}

export default Dashboard;