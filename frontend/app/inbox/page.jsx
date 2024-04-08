import Conversation from "../components/inbox/Conversation";
import { getUserID } from "../lib/actions";
import { apiGet } from "../services/apiServices";

const InboxPage = async () => {
    const conversations = await apiGet("http://127.0.0.1:8000/chat/");
    const userId = await getUserID();
    console.log(conversations);
    return (
        <main className="max-w-[1200px] mx-auto px-6 mt-5 mb-3">
            <h1 className="my-6 text-2xl">Inbox</h1>
            {
                conversations.map(
                    (conversation) =>
                        <Conversation
                            key={conversation.id}
                            userId={userId}
                            conversation={conversation}
                        />
                )
            }

        </main>
    )
}

export default InboxPage;