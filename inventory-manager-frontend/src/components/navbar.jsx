import { Link } from "react-router-dom";
import { useAuth } from "../providers/auth-provider.jsx";

export default function NavBar() {
    const { loggedInUser } = useAuth();

    return (
        <nav className="bg-gray-600 fixed top-0 w-full shadow-md">
            <div className="container mx-auto flex justify-between items-center p4">
                <Link to="/" className="text-white text-2xl font-bold">Inventory Manager</Link>
                <button className="text-white md:hidden" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false"
                    aria-label="Toggle navigation">

                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                <div className="hidden md:flex md:items-center md:space-x-4" id="navbarToggler">
                    {loggedInUser ? (
                        <>
                            <ul className="flex space-x-4">
                                <li>
                                    <Link to="/products" className="text-white hover:text-gray-300">Kamplocaties</Link>
                                </li>
                                <li>
                                    <Link to="/categories" className="text-white hover:text-gray-300">Bezoeken</Link>
                                </li>
                                {/* {loggedInUser.role === UserRole.ADMIN && (
                                    <>
                                        <li>
                                            <Link to="users" className="text-white hover:text-gray-300">Gebruikers</Link>
                                        </li>
                                        <li>
                                            <Link to="branches" className="text-white hover:text-gray-300">Speltakken</Link>
                                        </li>
                                    </>
                                )} */}
                            </ul>
                            <ul className="flex space-x-4">
                                <li className="relative">
                                    <button className="text-white hover:text-gray-300" id="userDropdown" aria-haspopup="true" aria-expanded="false">
                                        {loggedInUser.firstName} {loggedInUser.lastName}
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20" aria-labelledby="userDropdown">
                                        <Link to="/auth/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</Link>
                                    </div>
                                </li>
                            </ul>
                        </>
                    ) : null}
                </div>
            </div>
        </nav>
    )
}