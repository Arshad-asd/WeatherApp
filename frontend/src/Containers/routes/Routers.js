// Routers.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import Register from '../auth/Register';
import UserManagement from '../usermanagement/UserManagement';

const Routers = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<UserManagement />} />
    </Routes>
  );
};

export default Routers;

