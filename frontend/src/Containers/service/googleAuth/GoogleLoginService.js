import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const handleGoogleLogin = (dispatch, setGoogleUserInfo, showToast, navigate) => {
  return (
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
  );
};

export default handleGoogleLogin;
