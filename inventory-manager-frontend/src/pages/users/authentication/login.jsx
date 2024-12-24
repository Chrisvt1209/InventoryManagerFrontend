import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/auth-provider";
import { backendApi } from "../../../utils/backend-api.jsx"

export default function Login() {
    const navigate = useNavigate();
    const { updateToken } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });

    const handleLogin = async (value) => {
        setErrorMessage("");

        try {
            const response = await backendApi.post("/users/login", value);
            console.log("Login successful: ", response);
            updateToken(response.data.token);
            navigate("/");
        } catch (error) {
            console.error("Login failed: ", error);
            if (error?.response?.status === 403) {
                setErrorMessage("Invalid username or password");
            } else {
                setErrorMessage("An error occurred");
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded-lg"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Use a valid email address"
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Login</button>
                </form>
            </div>
        </div>
    );
}