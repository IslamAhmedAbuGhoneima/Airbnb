"use client";
import FormContext from "@/app/context/FormContext";
import { useContext } from "react";

const PasswordResetSuccessPage = () => {
    const { handelOpenLogin } = useContext(FormContext);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-bold mb-4">Password Reset Successful</h2>
                <p className="text-gray-700 mb-4">
                    Your password has been successfully reset. You can now log in using your new password.
                </p>
                <div
                    onClick={handelOpenLogin}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full inline-block"
                >
                    Log In
                </div>
            </div>
        </div>
    );
};

export default PasswordResetSuccessPage;
