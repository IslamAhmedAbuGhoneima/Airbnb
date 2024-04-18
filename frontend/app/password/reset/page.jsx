"use client"
import { resetPasswordApi } from "@/app/services/apiServices";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PasswordResetConfirmPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleResetPassword = async () => {
        const resetPassword = await resetPasswordApi(email);
        console.log(resetPassword);
        router.push('/password/email');

    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Password Reset</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Enter your email address"
                    />
                </div>
                <button
                    onClick={handleResetPassword}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:border-blue-500"
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
}

export default PasswordResetConfirmPage