"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
const PasswordResetPage = ({ params }) => {
    const { uuid64, token } = params;
    console.log("uuid64: ", uuid64);
    console.log("token: ", token);
    const router = useRouter();
    const [password, setPassword] = useState({
        email: "",
        password1: "",
        password2: ""
    });
    const [error, setError] = useState('');

    const handlePasswordChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        });
    };

    const handleResetPassword = async () => {
        if (password.password1 !== password.password2) {
            setError("Passwords don't match");
        } else {
            const { password1, password2, email } = password;

            const response = await fetch('http://localhost:8000/user/auth/password/reset/confirm/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: uuid64,
                    token: token,
                    new_password1: password1,
                    new_password2: password2,
                })
            });
            if (response.status == 200) {
                router.push("/password/reset/confirm")
            }
        }
    };
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">

                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="password1"
                            id="password"
                            defaultValue={password.password1}
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Enter your new password"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            defaultValue={password.password2}
                            name="password2"
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Confirm your new password"
                        />
                    </div>
                    {
                        error &&
                        <div className="mt-2 mb-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            {error}
                        </div>
                    }
                    <button
                        onClick={handleResetPassword}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:border-blue-500"
                    >
                        Reset Password
                    </button>
                </div>
            </div>
        </>

    )
}

export default PasswordResetPage