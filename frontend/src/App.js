import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Routers from "./Containers/routes/Routers";
import { useLocation } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  let location = useLocation();
  let adminHeader = location.pathname.startsWith("/auth");
  return (
    <div className="flex ">
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
      {adminHeader &&  <Sidebar />}

      <Routers />
    </div>
  );
}

export default App;
