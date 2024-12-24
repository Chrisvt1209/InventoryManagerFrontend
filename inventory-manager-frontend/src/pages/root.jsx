import Navbar from "../components/navbar.jsx";
import { Outlet } from "react-router-dom";
import { useTokenExpirationCheck } from "../hooks/use-token-expiration-check.jsx";

export default function Root() {
    useTokenExpirationCheck();
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="nav-size"></div> {/* This is a hack to make sure the content doesn't go under the navbar */}
                <Outlet />
            </div>
        </>
    )
}