import React, { useState, useEffect } from "react";
import SignupForm from "./components/signUp";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Users from "./components/Users";
import Course from "./components/Course";

function App() {
  // Initialize user state from localStorage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || false);

  // Update localStorage whenever the user state changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupForm onChangeUser={setUser} />} />
        <Route path="/Users" element={user ? <Users /> : <Navigate replace to="/" />} />
        <Route path="/Course" element={user ? <Course /> : <Navigate replace to="/" />} />
        <Route path="/dashboard" element={user ? <Dashboard onLogOut={() => setUser(false)} /> : <Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;