"use client";
import Image from "next/image"
import { useEffect, useState } from "react";
const Categories = () => {
    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/categories/", {
            cache: "no-cache",
        });
        const data = await response.json()
        setCategories(data);
    }

    useEffect(() => {
        getCategories();
    }, []);
    return (
        <div className="pt-3 cursor-pointer  flex items-center space-x-12 mb-4">
            {
                categories.map((category) =>
                    <div
                        key={category.uuid}
                        className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100">
                        <Image
                            src={category.icon_url}
                            alt={category.title}
                            width={20}
                            height={20}
                        />
                        <span className='text-xs'>{category.title}</span>
                    </div>
                )
            }
        </div>
    )
}

export default Categories