import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/userSlice/authSlice'
import adminAuthReducer from './slices/adminSlice/adminAuthSlice'
import googleAuthReducer from "./slices/googleSlice/googleAuthSlice";

const store = configureStore({
    reducer: {
      auth: authReducer,
      adminAuth: adminAuthReducer,
      googleAuth: googleAuthReducer,
    },
  });
  
  export default store;