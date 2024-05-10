// Routers.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';
import Register from '../pages/auth/Register';
import UserManagement from '../pages/usermanagement/UserManagement';
import PrivateRouteUser from '../utils/PrivateRouteUser'
import Login from '../pages/auth/Login';
const Routers = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='' element={<PrivateRouteUser />} >
           <Route path="/auth/dashboard" element={<Dashboard />} />
           <Route path="/auth/users" element={<UserManagement />} />
           
      </Route>

    </Routes>
  );
};

export default Routers;

