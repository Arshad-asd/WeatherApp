import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import backgroundImage from '../assets/welcome.jpg';

const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full" style={{backgroundImage: `url(${backgroundImage})`}}>
      <motion.h1
        className="text-4xl font-bold text-center mb-8 hover:text-yellow-300"
        initial={{ x: -100, opacity: 0 }} // Initial position and opacity
        animate={{ x: 0, opacity: 1 }} // Animation when component is mounted
        transition={{ type: 'spring', stiffness: 80 }} // Animation transition
      >
        Welcome to our Weather App
      </motion.h1>
      <motion.div
        className="flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0 }} // Initial opacity
        animate={{ opacity: 1 }} // Animation when component is mounted
        transition={{ delay: 0.5 }} // Delay for animation
      >
        <Link
          to="/admin/login"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
        >
          <motion.span
            initial={{ scale: 0 }} // Initial scale
            animate={{ scale: 1 }} // Animation when component is mounted
            transition={{ delay: 0.8 }} // Delay for animation
          >
            Login as Admin
          </motion.span>
        </Link>
        <Link
          to="/login"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
        >
          <motion.span
            initial={{ scale: 0 }} // Initial scale
            animate={{ scale: 1 }} // Animation when component is mounted
            transition={{ delay: 0.8 }} // Delay for animation
          >
            Login as User
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
