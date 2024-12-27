import { useAuth } from "../providers/auth-provider.jsx";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProtectedRoute({ roles = [] }) {
    const { token, loggedInUser } = useAuth();

    if (!token) {
        console.log("User is not authenticated. Redirecting to login page.");
        return <Navigate to="/login" />;
    }

    if (roles.length > 0 && !roles.includes(loggedInUser?.role)) {
        console.log("User is not authorized to view this page. Redirecting to error page.");
        return <Navigate to="/errors/forbidden" />;
    }

    return <Outlet />;
}

ProtectedRoute.propTypes = {
    roles: PropTypes.array
};