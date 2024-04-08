import PropertyList from "@/app/components/properties/PropertyList";
import ContactButton from "@/app/components/elements/ContactButton";
import Image from "next/image";
import { getUserID } from "@/app/lib/actions";


const getLandlord = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/user/auth/user-detail/${id}/`);
    return await response.json();
}
const LandLords = async ({ params }) => {
    const { id } = params;
    const landlord = await getLandlord(id);
    const userId = await getUserID();
    return (
        <main className="max-w-[1200px] mx-auto px-6 mt-5 mb-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <aside className="col-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
                        <Image
                            src={landlord?.avatar_url || '/hosts/avatar.png'}
                            className="rounded-full w-32 h-32 shadow-xl"
                            alt="host-image" width={200} height={200}
                        />
                        <h1 className="text-2xl mt-4 mb-4 font-semibold">{landlord.username}</h1>
                        {
                            userId != id && <ContactButton landlord_id={landlord.id} />
                        }
                    </div>
                </aside>
                <div className="cls-span-1 md:col-span-3 pl-0 md-pl-6">
                    <PropertyList
                        key={id}
                        landlord_id={id}
                    />
                </div>
            </div>
        </main>
    )
}

export default LandLords