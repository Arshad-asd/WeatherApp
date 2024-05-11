// Routers.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';
import Register from '../pages/auth/Register';
import UserManagement from '../pages/usermanagement/UserManagement';
import PrivateRouteUser from '../utils/PrivateRouteUser'
import PrivateRouteAdmin from '../utils/PrivateRouteAdmin';
import Login from '../pages/auth/Login';
import ErrorPage from '../../components/ErrorPage';
import WelcomPage from '../../components/WelcomPage';
import AdminLogin from '../pages/auth/AdminLogin';
import UserDashboard from '../pages/dashboard/UserDashboard';

const Routers = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<WelcomPage />} />
      <Route path='' element={<PrivateRouteUser />} >
           <Route path="/auth/user/dashboard" element={<UserDashboard />} />
           <Route path="auth/*" element={<ErrorPage/>} />

      </Route>
      <Route path='/admin/login' element={<AdminLogin />} />
      <Route path='' element={<PrivateRouteAdmin />} > 
      <Route path="/auth/admin/dashboard" element={<Dashboard />} />
           <Route path="/auth/admin/users" element={<UserManagement />} />
      </Route>
      <Route path="*" element={<ErrorPage/>} />

    </Routes>
  );
};

export default Routers;

