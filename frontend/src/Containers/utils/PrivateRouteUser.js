import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRouteUser = () => {
    const { userInfo } = useSelector(state => state.auth);
    const { googleUserInfo } = useSelector(state => state.googleAuth);

    // Check if either userInfo or googleUserInfo is present
    const isAuthenticated = userInfo || googleUserInfo;

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRouteUser;
