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
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (response?.status === 200) {
                navigate("/auth/login")
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    const password = watch("password");

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Create an account</h2>
                <form className="space-y-4" onSubmit={handleSubmit(handleRegisterUser)}>
                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded-lg"
                            {...register("email", { required: "Email is required" })}
                            placeholder="email@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* First name */}
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-gray-700">First name</label>
                        <input
                            type="text"
                            id="firstName"
                            className="w-full px-3 py-2 border rounded-lg"
                            {...register("firstName", { required: "First name is required" })}
                            placeholder="First name"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                    </div>

                    {/* Last name */}
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-gray-700">Last name</label>
                        <input
                            type="text"
                            id="lastName"
                            className="w-full px-3 py-2 border rounded-lg"
                            {...register("lastName", { required: "Last name is required" })}
                            placeholder="Last name"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border rounded-lg"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long"
                                }
                            })}
                            placeholder="Password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Confirm password */}
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700">Confirm password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="w-full px-3 py-2 border rounded-lg"
                            {...register("confirmPassword", {
                                required: "Passwords must match",
                                validate: (value) => value === password || "Passwords do not match",
                            })}
                            placeholder="Confirm password"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </div>

                    <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Create an account</button>
                    <p className="text-sm text-gray-500 text-center">
                        Already have an account? <Link to={"/auth/login"} className="text-blue-500 hover:underline">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}