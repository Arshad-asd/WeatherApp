import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/userSlice/authSlice'
import adminAuthReducer from './slices/adminSlice/adminAuthSlice'

const store = configureStore({
    reducer: {
      auth: authReducer,
      adminAuth: adminAuthReducer,
    },
  });
  
  export default store;