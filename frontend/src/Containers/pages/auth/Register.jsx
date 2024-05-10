import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

import { validateEmail, validatePassword, validateName, validateField } from '../../utils/formValidation';
import { toast } from 'react-toastify';
import instance from '../../utils/axios.js'

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    const fieldErrors = validateField(name, value, formData);
    const newErrors = { ...validationErrors };
  
    // Update the validation error for the current field
    newErrors[name] = fieldErrors[name] || '';
  
    // Remove the error message if the field value is valid
    if (!fieldErrors[name] || !fieldErrors[name].trim()) {
      delete newErrors[name];
    }
  
    setValidationErrors(newErrors);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
    Object.keys(formData).forEach((name) => {
      const fieldErrors = validateField(name, formData[name], formData);
      if (Object.keys(fieldErrors).length > 0) {
        newErrors[name] = fieldErrors[name];
      }
    });
  
    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      return;
    }
  
    try {
      const response = await instance.post('/api/user/register/', {
        email: formData.email,
        password: formData.password,
        // Additional fields if needed
      });
  
      if (response.status === 201) {
        console.log('Registration successful:', response.data);
        toast('Registration successful', 'success');
        navigate("/login");
      } else {
        console.error('Registration failed:', response.data);
        toast('Registration failed: ' + response.data.error);
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      toast('Registration failed: ' + error.message);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 px-4">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl mb-6 text-center">Register</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${validationErrors.email ? 'border-red-500' : ''}`}
            />
            {validationErrors.email && <p className="text-sm text-red-500 mt-1">{validationErrors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${validationErrors.password ? 'border-red-500' : ''}`}
            />
            {validationErrors.password && <p className="text-sm text-red-500 mt-1">{validationErrors.password}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${validationErrors.confirmPassword ? 'border-red-500' : ''}`}
            />
            {validationErrors.confirmPassword && <p className="text-sm text-red-500 mt-1">{validationErrors.confirmPassword}</p>}
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            >
              Sign UP
            </button>
            <button
              type="button"
              className="bg-red-300 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
            >
              <div className="flex items-center justify-center">
                <FcGoogle />
                <span className="ml-2">Register with Google</span>
              </div>
            </button> 
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
