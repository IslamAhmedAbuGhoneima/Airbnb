import ConversationDetail from "@/app/components/inbox/ConversationDetail";

const ConversationPage = () => {
    return (
        <main className="max-w-[1200px] mx-auto px-6 mt-5 mb-3">
            <h1 className="my-6 text-2xl">Inbox</h1>
            <ConversationDetail />
        </main>
    )
}

export default ConversationPage;