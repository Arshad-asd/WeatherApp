import { DataGrid } from "@mui/x-data-grid";
import { FaUnlock, FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { adminInstance } from "../../utils/axios";
import { useSelector } from "react-redux";


export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [blocked, setBlocked] = useState(false);
  const { adminInfo } = useSelector((state) => state.adminAuth || {});
  // Define columns with details for each field
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "is_active",
      headerName: "Active",
      width: 100,
      renderCell: (params) => (
        <div className={`pill ${params.row.is_active ? "active" : "inactive"}`}>
          {params.row.is_active ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <button
          className={`custom-button${
            params.row.is_active ? "-inactive" : "-active"
          }`}
          onClick={(e) =>
            handleBlockClick(e, params.row.id, params.row.is_active)
          }
        >
          {params.row.is_active ? <FaLock size={18} /> : <FaUnlock size={18} />}
        </button>
      ),
    },

  ];

  const handleBlockClick = async (e, userId) => {
    e.stopPropagation();
    try {
      setBlocked(!blocked);
      const token = adminInfo.access; // Get the access token from the user info
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await adminInstance.patch(`/block-unblock/${userId}/`, null, config); // Pass the config with the token to the patch request
      fetchData(); // Fetch data after blocking/unblocking user
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };
  

  const fetchData = async () => {
    try {
      const token = adminInfo.access
      console.log('token',token)
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await adminInstance.get('/users-list/', config);
      setFilteredRows(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [blocked, searchTerm]);

  return (
    <>
<div className="flex justify-center items-center h-full">
  <div className="m-10">
    <DataGrid
      rows={filteredRows}
      columns={columns}
      pageSize={5}
      checkboxSelection
      getRowId={(row) => row.id}
      className="" // Ensure the DataGrid takes full width
    />
  </div>
</div>

    </>
  );
}