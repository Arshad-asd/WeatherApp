import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/AdminSidebar";
import UserSidebar from "./components/UserSidebar"; // Import the UserSidebar component
import Routers from "./Containers/routes/Routers";
import { useLocation } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  let location = useLocation();
  let adminHeader = location.pathname.startsWith("/auth/admin");
  
  return (
    <div className="flex">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {adminHeader ? <Sidebar /> : <UserSidebar />} {/* Render AdminSidebar if adminHeader is true, otherwise render UserSidebar */}
      <Routers />
    </div>
  );
}

export default App;
