"use client"
import FormContext from "@/app/context/FormContext";
import { useContext } from "react";

const UserMenuOptions = () => {
    const { handelOpenSingup, handelOpenLogin } = useContext(FormContext);
    return (
        <div className="absolute pt-2 overflow-hidden w-[250px] bg-white rounded-xl shadow-xl border border-gray-300 -bottom-36 -left-44">
            <ul>
                <li onClick={handelOpenSingup} className="hover:bg-gray-100 transition p-2 cursor-pointer mb-4 font-semibold">Sing up</li>
                <li onClick={handelOpenLogin} className="hover:bg-gray-100 transition p-2 cursor-pointer mb-4">Log in</li>
            </ul>
        </div>
    )
}

export default UserMenuOptions;