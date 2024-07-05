import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './navbar'; // Assuming Navbar is in the same directory
import Courses from './Course'; // Assuming Courses.jsx is the component for courses
import Users from './Users'; // Assuming Users.jsx is the component for users

function Dashboard({OnLogOut}) {

  return (
    <div>
      <Navbar OnLogOut={OnLogOut} />

    </div>
  );
}

export default Dashboard;