import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ isAuth, children}) => {
    if (!isAuth) {
        return <Navigate to="/" replace />;
    }
    return children ? children : <Outlet />;
};