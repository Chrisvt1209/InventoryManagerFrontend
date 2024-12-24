import { useAuth } from "../../../providers/auth-provider.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();
    const { updateToken } = useAuth();

    const handleLogout = () => {
        updateToken(null);
        navigate("/auth/login");
    };

    useEffect(() => {
        handleLogout();
    }, []);

    return (
        <div>Logging out...</div>
    );
}