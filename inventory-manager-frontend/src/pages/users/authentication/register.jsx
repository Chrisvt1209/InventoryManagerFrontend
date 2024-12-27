import { useState } from "react";
import { useForm } from "react-hook-form";
import { backendApi } from "../../../utils/backend-api.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        mode: "onBlur"
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegisterUser = async (data) => {
        setErrorMessage("");
        try {
            const response = await backendApi.post('/users/register', JSON.stringify({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.password
            }), {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response?.status === 200) {
                navigate("/auth/login")
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const password = watch("password");

    return (
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create an account</h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleRegisterUser)}>
                    {setErrorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("email", { required: "Email is required" })}
                            placeholder="youremail@example.com"
                            required=""
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* First name */}
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">First name</label>
                        <input
                            type="text"
                            id="firstName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("firstname", { required: "First name is required" })}
                            placeholder="Your first name"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                    </div>

                    {/* Last name */}
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Last name</label>
                        <input
                            type="text"
                            id="lastName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("lastname", { required: "Last name is required" })}
                            placeholder="Your last name"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 6 characters long"
                                }
                            })}
                            placeholder="Password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Confirm password */}
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Confirm password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("email", {
                                required: "Passwords must match",
                                validate: value => value === password || "Passwords do not match"
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <Link to={"/auth/login"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}