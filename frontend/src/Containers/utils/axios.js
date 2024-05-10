import axios from "axios";
export const baseUrl = "https://backend.blearning.website";
const instance = axios.create({
  baseURL: `${baseUrl}`,
});

export default instance;


export const adminInstance = axios.create({
  baseURL: `${baseUrl}/api/admin`,
});


const token = localStorage.getItem("tutorInfo")
    ? JSON.parse(localStorage.getItem("tutorInfo")).access
    : null;

export const tutorInstance = axios.create({
  baseURL: `${baseUrl}/api/tutor`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});