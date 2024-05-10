import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Routers from "./Containers/routes/Routers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
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
      <BrowserRouter>
      <Sidebar />
      <Routers />
      </BrowserRouter>
    </div>
  );
}

export default App;
