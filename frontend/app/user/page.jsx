"use client";
import React, { useEffect, useRef, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { getAccessToken } from '../lib/actions';
import Image from 'next/image';
import { updateUserApi } from '../services/apiServices';
import ChangePassword from '../components/form/ChangePassword';

const UserDetails = () => {
    const [data, setData] = useState({});
    const [updateUser, setUpdateUser] = useState({
        username: data?.username,
        email: data?.email,
        avatar: data?.avatar,
    });
    const [openPasswordChangeFields, setOpenPasswordChangeFields] = useState(false);

    const fileInput = useRef('');
    const func = async () => {
        const accessToken = await getAccessToken();
        if (accessToken) {
            const decoded = jwtDecode(accessToken);
            const { user_id } = decoded;
            setData(await getUserDetails(user_id));
        }
    }

    const getUserDetails = async (userId) => {
        const response = await fetch(`http://127.0.0.1:8000/user/auth/user-detail/${userId}/`)
        return await response.json()
    }

    const handleInputChange = (e) => {
        setUpdateUser({
            ...updateUser,
            [e.target.name]: e.target.value
        });
    }

    const handleFileChange = (e) => {
        const fileImage = e.target.files[0];
        setUpdateUser({
            ...updateUser,
            avatar: fileImage,
        });
    };

    const handleUpdateUser = async () => {
        const formData = new FormData();
        formData.append('username', updateUser.username || data.username);
        formData.append('email', updateUser.email || data.email);
        formData.append('avatar', updateUser.avatar || data.avatar_url);
        const response = await updateUserApi('http://127.0.0.1:8000/user/auth/user-update/', formData);
        console.log(response);
    }

    const handleOpenPasswordChangeFields = () => {
        setOpenPasswordChangeFields((prev) => !prev);
    }

    useEffect(() => {
        func();
    }, []);
    return (
        <div className='w-[60%] m-auto'>
            <h1 className='mt-5 mb-5 m-auto font-bold text-xl'>Personal Information:</h1>
            <section className='border m-auto p-5'>
                <div className='flex gap-6 justify-between items-center'>
                    <div>
                        <Image
                            onClick={() => fileInput.current.click()}
                            className='w-[200px] h-[200px] rounded-xl  cursor-pointer'
                            src={updateUser.avatar ? URL.createObjectURL(updateUser.avatar) : data.avatar_url || '/hosts/default_avatar.jpg'}
                            width={200}
                            height={200}
                            alt='user image'
                        />
                        <div className='mt-3'>
                            <span className="sr-only">Change your photo</span>
                            <input
                                onChange={handleFileChange}
                                ref={fileInput}
                                type="file"
                                className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100"
                            />
                        </div>
                    </div>
                    <div>
                        <form method='POST' className="w-full max-w-sm">
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4"
                                        htmlFor="inline-username"
                                    >
                                        Username
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input
                                        onChange={handleInputChange}
                                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                        id="inline-username"
                                        name='username'
                                        type="text"
                                        defaultValue={data.username}
                                    />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label
                                        className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4"
                                        htmlFor="inline-email">
                                        Email
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input
                                        onChange={handleInputChange}
                                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                        id="inline-email"
                                        type="email"
                                        name='email'
                                        defaultValue={data.email}
                                        placeholder="es@example.com"
                                    />
                                </div>
                            </div>
                            <div className="md:flex md:items-center">
                                <div className="md:w-2/3 flex gap-2">
                                    <button
                                        onClick={handleUpdateUser}
                                        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                        type="button"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleOpenPasswordChangeFields}
                                        className="text-nowrap shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                        type="button"
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </section>
            <ChangePassword
                showPasswordChange={openPasswordChangeFields}
            />
        </div>

    )
}

export default UserDetails;