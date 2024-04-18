"use client";
import { useEffect, useState } from "react";

const EmailConfirmationSuccessPage = ({ params }) => {
    let { key } = params;
    key = key.replaceAll("%3A", ":");
    const [detail, setDetail] = useState(true);
    const handleConfirmEmail = async () => {
        const response = await fetch("http://localhost:8000/user/auth/register/verify-email/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "key": key })
        });
        const data = await response.json();
        setDetail(data['detail'] == "ok" ? true : false);
    }
    useEffect(() => {
        handleConfirmEmail();
    }, []);
    const content = (
        detail &&
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md" >
                <img className="mx-auto h-12 w-auto" src="/logo.png" alt="Logo" />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Email Confirmed!</h2>
                <p className="mt-2 text-center text-sm text-gray-600">Thank you for confirming your email address.</p>
            </div>
        </div >
    )
    return (
        content
    )
}

export default EmailConfirmationSuccessPage