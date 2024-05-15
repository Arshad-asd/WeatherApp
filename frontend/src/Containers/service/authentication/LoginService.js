import instance from "../../utils/axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../redux/slices/userSlice/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useFormSubmit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (formData, setValidationErrors) => {
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

  return handleSubmit;
};

export default useFormSubmit;
