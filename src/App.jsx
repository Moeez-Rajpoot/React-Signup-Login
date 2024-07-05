import React, { useState } from "react";
import SignupForm from "./components/signUp";
import Dashboard from "./components/Dashboard"; // Assuming you have this component
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Users from "./components/Users";
import Course from "./components/Course";

function App() {
  const [user, setUser] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupForm onChangeUser={setUser} />} />

        <Route
          path="/Users"
          element={user ? <Users /> : <Navigate replace to="/" />}
        />
        <Route
          path="/Course"
          element={user ? <Course /> : <Navigate replace to="/" />}
        />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard onLogOut={setUser} />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
