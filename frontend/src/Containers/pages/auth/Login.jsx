import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../../utils/axios";
import { setCredentials } from "../../../redux/slices/userSlice/authSlice";
import { setGoogleUserInfo } from "../../../redux/slices/googleSlice/googleAuthSlice";
import bacgroundImg from "../../../assets/register.jpg";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";



const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { googleUserInfo } = useSelector((state) => state.googleAuth);

  useEffect(() => {
    const shouldNavigate = userInfo || googleUserInfo;

    if (shouldNavigate) {
      console.log("Navigating user dashboard");
      navigate("/auth/user/dashboard");
    }
  }, [navigate, userInfo, googleUserInfo]);

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear validation error when input changes
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const showToast = (message, type = "error") => {
    toast[type](message, {
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await instance.post(`/api/user/login/`, formData);

      try {
        // Decoding access token
        const decodedAccessToken = jwtDecode(res.data.access);

        // Dispatch action to set credentials
        dispatch(
          setCredentials({ user_role: decodedAccessToken.role, ...res.data })
        );

        showToast("Successfully logged in", "success");
        navigate("/auth/user/dashboard");
      } catch (decodeError) {
        console.error("Error decoding token:", decodeError.message);
        showToast("Error decoding token", "error");
      }
    } catch (error) {
      console.error("API request error:", error);

      if (error.response && error.response.status === 401) {
        showToast(error.response.data.detail || "Unauthorized", "error");
      } else if (error.response && error.response.status === 400) {
        setValidationErrors(error.response.data);
      } else {
        showToast(error?.response?.data || "Server Error", "error");
      }
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen w-full"
      style={{ backgroundImage: `url(${bacgroundImg})` }}
    >
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 px-4">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl mb-6 text-center">Login</h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${validationErrors.email ? "border-red-500" : ""
                }`}
            />
            {validationErrors.email && (
              <p className="text-sm text-red-500 mt-1">
                {validationErrors.email}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${validationErrors.password ? "border-red-500" : ""
                }`}
            />
            {validationErrors.password && (
              <p className="text-sm text-red-500 mt-1">
                {validationErrors.password}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            >
              Login
            </button>
            <div className="flex justify-center items-center  m-2">
              <hr className="border-gray-300 flex-grow" />
              <span className="">or</span>
              <hr className="border-gray-300 flex-grow" />
            </div>
            <GoogleOAuthProvider clientId="917182671697-r4393aovn41i2eais6t29eorvc2jla9e.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  const decoded = jwtDecode(credentialResponse.credential)
                  console.log('decoded', decoded)
                  dispatch(
                    setGoogleUserInfo({ user_role: 'user', ...decoded })
                  );
                  showToast("Successfully logged in", "success");
                  navigate("/auth/user/dashboard");
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />

            </GoogleOAuthProvider>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
