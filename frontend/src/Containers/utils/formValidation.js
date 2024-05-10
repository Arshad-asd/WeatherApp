import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  

  
  export const validatePassword = (password) => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
  
    const isLowerCaseValid = lowercaseRegex.test(password);
    const isUpperCaseValid = uppercaseRegex.test(password);
    const isNumberValid = numberRegex.test(password);
  
    return {
      isLowerCaseValid,
      isUpperCaseValid,
      isNumberValid,
      isLengthValid: password.length >= 6,
    };
  };
  
  export const validateName = (name) => {
    // Assuming a standard name should only contain letters
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };
  
  export const validateField = (name, value, formData) => {
    switch (name) {
      case 'email':
        if (!validateEmail(value)) {
          return { [name]: 'Invalid email format' };
        }
        break;

      case 'password':
        const passwordValidation = validatePassword(value);
        if (!passwordValidation.isLowerCaseValid) {
          return { [name]: 'Password must contain at least one lowercase letter' };
        } else if (!passwordValidation.isUpperCaseValid) {
          return { [name]: 'Password must contain at least one uppercase letter' };
        } else if (!passwordValidation.isNumberValid) {
          return { [name]: 'Password must contain at least one number' };
        } else if (!passwordValidation.isLengthValid) {
          return { [name]: 'Password must be at least 6 characters long' };
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          return { [name]: 'Passwords do not match' };
        }
        break;
      case 'first_name':
        if (!validateName(value)) {
          return { [name]: 'Invalid first name format' };
        }
        break;
      default:
        break;
    }
  
    return {};
  };
  