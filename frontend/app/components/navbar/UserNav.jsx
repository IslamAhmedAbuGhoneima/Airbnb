"use client"
import { useContext, useState } from "react";
import FormContext from "@/app/context/FormContext";
const UserNav = ({ userID }) => {
    const { handelOpenSingup, handelOpenLogin, logout } = useContext(FormContext);
    const [isOpen, setIsOpen] = useState(false);
    const handelOpen = () => setIsOpen(prev => !prev);
    return (
        <div onClick={handelOpen}>
            <div className="cursor-pointer flex justify-between items-center border rounded-full p-3 hover:shadow-inner">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </div>
            {isOpen &&
                <div className="absolute pt-2 overflow-hidden  w-[250px] bg-white rounded-xl shadow-xl border border-gray-300 right-0 mt-5">
                    <ul>
                        {
                            userID ?
                                <li onClick={logout} className="hover:bg-gray-100 transition p-2 pb-4 cursor-pointer">Logout</li>
                                :
                                <>
                                    <li onClick={handelOpenLogin} className="hover:bg-gray-100 transition p-2 mb-4 cursor-pointer">Log in</li>
                                    <li onClick={handelOpenSingup} className="hover:bg-gray-100 transition p-2 cursor-pointer font-semibold border-b">Sing up</li>
                                </>
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default UserNav