import axios from "axios";
export const baseUrl = "http://127.0.0.1:8000";
const instance = axios.create({
  baseURL: `${baseUrl}`,
});

export default instance;


export const adminInstance = axios.create({
  baseURL: `${baseUrl}/api/admin`,
});


