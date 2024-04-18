"use client";
import FormContext from "@/app/context/FormContext";
import { passwordChangeHandler } from "@/app/services/apiServices";
import { useContext, useState } from "react";
const ChangePassword = ({ showPasswordChange }) => {
    const { logout } = useContext(FormContext);
    const [changePassword, setChangePassword] = useState({
        'password1': '',
        'password2': '',
    });
    const handlePasswordChange = (e) => {
        setChangePassword({
            ...changePassword,
            [e.target.name]: e.target.value,
        })
    }
    const submitChangePassword = async () => {
        const formData = new FormData();
        formData.append('new_password1', changePassword.password1);
        formData.append('new_password2', changePassword.password2);
        await passwordChangeHandler(formData);
        alert("password changed Succssfully");
        setChangePassword({
            'password1': '',
            'password2': '',
        });
        logout();
    }
    return (
        <div className="mt-2 mb-2">
            {
                showPasswordChange &&  // Render password change fields conditionally
                <>
                    <h1 className="mt-4 mb-4 font-bold text-lg">Change your Password:</h1>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4"
                                htmlFor="inline-password1">
                                New Password
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                onChange={handlePasswordChange}
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-password1"
                                type="password"
                                name='password1'
                                value={changePassword.password1}
                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4"
                                htmlFor="inline-password2">
                                Confirm Password
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                onChange={handlePasswordChange}
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-password2"
                                type="password"
                                name='password2'
                                value={changePassword.password2}
                            />
                        </div>
                    </div>
                    <button
                        onClick={submitChangePassword}
                        className="text-nowrap shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="button"
                    >
                        Save new password
                    </button>
                </>
            }
        </div>
    )
}



export default ChangePassword