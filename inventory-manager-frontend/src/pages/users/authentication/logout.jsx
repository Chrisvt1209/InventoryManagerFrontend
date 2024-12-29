import { useAuth } from "../../../providers/auth-provider.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();
    const { updateToken } = useAuth();

    useEffect(() => {
        updateToken(null);
        navigate("/auth/login");
    }, [updateToken, navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-700 text-lg font-semibold" aria-live="polite">Logging out, please wait...</div>
    );
}