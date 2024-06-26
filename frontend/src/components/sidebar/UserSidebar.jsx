import React, { useState } from 'react'
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from '../../redux/slices/userSlice/authSlice';
import { clearGoogleUserInfo } from '../../redux/slices/googleSlice/googleAuthSlice';


function Sidebar() {
    const menus = [
        { name: "dashboard", link: '/auth/user/dashboard', icon: MdOutlineSpaceDashboard },

    ];
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userInfo } = useSelector(state => state.auth);
    const { googleUserInfo } = useSelector(state => state.googleAuth);

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

    const handleLogout = () => {
        if (userInfo) {
            dispatch(logout());
            showToast("Logout successfully", "success");
            navigate('/login');
        } else if (googleUserInfo) {
            dispatch(clearGoogleUserInfo());
            showToast("Logout successfully", "success");
            // Redirect to the login page or do any other necessary actions
        } else {
            // Handle if neither userInfo nor googleUserInfo is available
            showToast("No user logged in", "error");
        }
    };

    return (
        <section className='flex gap-6'>
            <div className={`bg-[#0c0c0c] min-h-screen ${open ? 'w-60' : 'w-16'} duration-500 text-gray-100 px-4`}>
                <div className='py-3 flex justify-end'>
                    <HiMenuAlt3 size={26} className='cursor-pointer' onClick={() => setOpen(!open)} />
                </div>
                <div className='mt-4 flex flex-col gap-4 relative'>
                    {
                        menus?.map((menu, i) => (
                            <Link to={menu?.link} key={i}
                                className='group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'>
                                <div>
                                    {React.createElement(menu?.icon, { size: '20' })}
                                </div>
                                <h2
                                    style={{
                                        transitionDelay: `${i + 3}00ms`
                                    }}
                                    className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>{menu?.name}
                                </h2>
                                <h2 className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
                                    {menu?.name}
                                </h2>
                            </Link>
                        ))
                    }
                    {/* Add some space between the link and the logout button */}
                    <div className="mt-4">
                        {open ? (
                            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                                Logout
                            </button>
                        ) : (
                            <button onClick={handleLogout} className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline w-full">
                                <RiLogoutCircleRLine size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Sidebar;
