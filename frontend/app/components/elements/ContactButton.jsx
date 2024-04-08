"use client";

import { apiGet } from "@/app/services/apiServices";
import { useRouter } from "next/navigation";


const ContactButton = ({ landlord_id }) => {
    const router = useRouter();
    const handleContact = async () => {
        const data = await apiGet(`http://127.0.0.1:8000/chat/${landlord_id}/start-conversation/`);
        router.push(`http://localhost:3000/inbox/${data[0].id}`)
    }

    return (
        <div
            onClick={handleContact}
            className="cursor-pointer text-base text-white py-4 px-6 rounded-xl bg-airbnb hover:bg-airbnbDark transition">
            Contact
        </div>
    )
}

export default ContactButton;