import { createContext, useContext, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { backendApi } from "../utils/backend-api.jsx";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [loggedInUser, setLoggedInUser] = useState(() => JSON.parse(sessionStorage.getItem("loggedInUser")));
    const [loading, setLoading] = useState(false);

    const updateToken = (newToken) => {
        setToken(newToken);
    };

    const refreshUserInfo = async () => {
        setLoading(true);
        try {
            const response = await backendApi.get("/users/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLoggedInUser(response.data);
            sessionStorage.setItem("loggedInUser", JSON.stringify(response.data));
        } catch (error) {
            console.error("Failed to refresh user info: ", error);
            setLoggedInUser(null);
            sessionStorage.removeItem("loggedInUser");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            sessionStorage.setItem("token", token);
            refreshUserInfo();
        } else {
            sessionStorage.removeItem("token");
            setLoggedInUser(null);
            sessionStorage.removeItem("loggedInUser");
        }
    }, [token]);

    const contextValue = useMemo(() => ({
        token,
        updateToken,
        loggedInUser,
        refreshUserInfo,
        loading
    }), [token, loggedInUser, loading]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};