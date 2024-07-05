import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './navbar'; // Assuming Navbar is in the same directory
import Courses from './Course'; // Assuming Courses.jsx is the component for courses
import Users from './Users'; // Assuming Users.jsx is the component for users

function Dashboard({OnLogOut}) {

  return (
    <div>
      <Navbar OnLogOut={OnLogOut} />

      <div className="bg-black w-screen h-screen">

        <p className='text-white font-roboto text-2xl'>Welcome Back!</p>
      </div>
    </div>
  );
}

export default Dashboard;