"use client";
import { useRouter } from "next/navigation";

const Conversation = ({ userId, conversation }) => {
    const router = useRouter();
    const otherUser = conversation.users.find((user) => user.id != userId);
    return (
        <div className="cursor-pointer px-6 py-4 border border-gray-300 rounded-xl mb-4">
            <p className="mb-6 text-xl">{otherUser.email}</p>
            <p
                className="cursor-pointer text-airbnbDark"
                onClick={() => router.push(`inbox/${conversation.id}/`)}
            >Go to conversation</p>
        </div>
    )
}

export default Conversation