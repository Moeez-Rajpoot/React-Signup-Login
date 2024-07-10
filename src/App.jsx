import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './Context/UserContext'; // Adjust the import path as necessary
import SignupForm from './components/signUp';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Course from './components/Course';
import Profile from './components/Profile';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

function App() {
  const { user, setUser } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupForm onChangeUser={() => setUser(true)} />} />
        <Route path="/Users" element={user ? <Users /> : <Navigate replace to="/" />} />
        <Route path="/Profile" element={user ? <Profile /> : <Navigate replace to="/" />} />
        <Route path="/Course" element={user ? <Course /> : <Navigate replace to="/" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;