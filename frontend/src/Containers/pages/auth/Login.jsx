import React, { useState } from "react";
import { navigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginFormUI from "../../../components/forms/LoginForm";
import useFormSubmit from "../../service/authentication/LoginService";
import bacgroundImg from "../../../assets/register.jpg"
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const handleSubmit = useFormSubmit();

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

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData, setValidationErrors);
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen w-full"
      style={{ backgroundImage: `url(${bacgroundImg})` }}
    >
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 px-4">
        <LoginFormUI
          formData={formData}
          validationErrors={validationErrors}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default Login;
