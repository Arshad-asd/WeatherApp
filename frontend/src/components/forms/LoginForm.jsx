import React from "react";

const LoginFormUI = ({ formData, validationErrors, onChange, onSubmit }) => {
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
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
          required
          placeholder="Enter your email"
          value={formData.email}
          onChange={onChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            validationErrors.email ? "border-red-500" : ""
          }`}
        />
        {validationErrors.email && (
          <p className="text-sm text-red-500 mt-1">{validationErrors.email}</p>
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
          required
          placeholder="Enter your password"
          value={formData.password}
          onChange={onChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            validationErrors.password ? "border-red-500" : ""
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
      </div>
    </form>
  );
};

export default LoginFormUI;
