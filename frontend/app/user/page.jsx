import React from 'react'
import { jwtDecode } from 'jwt-decode';
import { getAccessToken } from '../lib/actions';
import Image from 'next/image';
const getUserDetails = async (userId) => {
    const response = await fetch(`http://127.0.0.1:8000/user/auth/user-detail/${userId}/`)
    return await response.json()
}
const UserDetails = async () => {
    const accessToken = await getAccessToken();
    let data = {};
    if (accessToken) {
        const decoded = jwtDecode(accessToken);
        const { user_id } = decoded;
        data = await getUserDetails(user_id);
    }
    console.log(data);
    return (
        <section className='border w-[60%] m-auto p-5 mt-12'>
            <div className='flex gap-6 justify-between items-center'>
                <div>
                    <Image className='w-[200px] h-[200px] rounded-full cursor-pointer'
                        src={'/hosts/host1.webp'}
                        width={200}
                        height={200}
                        alt='user image'
                    />
                    <div className='mt-3'>
                        <span className="sr-only">Change your photo</span>
                        <input type="file"
                            className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100 "
                        />
                    </div>
                </div>
                <div>
                    <form method='POST' className="w-full max-w-sm">
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4"
                                    htmlFor="inline-username">
                                    Username
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="inline-username"
                                    type="text"
                                    defaultValue={data.username} />
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
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="inline-email"
                                    type="email"
                                    defaultValue={data.email}
                                    placeholder="es@example.com"
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <div className="md:w-2/3">
                                <button disabled={true} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default UserDetails;