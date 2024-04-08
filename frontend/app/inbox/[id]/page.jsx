import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { getAccessToken, getUserID } from "@/app/lib/actions";
import { apiGet } from "@/app/services/apiServices";
const ConversationPage = async ({ params }) => {
    const userId = await getUserID();
    const token = await getAccessToken();
    const { id } = params;
    const conversation = await apiGet(`http://127.0.0.1:8000/chat/${id}`);
    return (
        <main className="max-w-[1200px] mx-auto px-6 mt-5 mb-3">
            <h1 className="my-6 text-2xl">Inbox</h1>
            <ConversationDetail
                userId={userId}
                token={token}
                conversation={conversation}
            />
        </main>
    )
}

export default ConversationPage;