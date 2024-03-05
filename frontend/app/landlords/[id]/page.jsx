import PropertyList from "@/app/components/properties/PropertyList"
import CustomButton from "@/app/components/elements/CustomButton"
import Image from "next/image"
const LandLords = () => {
    return (
        <main className="max-w-[1200px] mx-auto px-6 mt-5 mb-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <aside className="col-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
                        <Image
                            src="/hosts/host1.webp"
                            className="rounded-full w-32 h-32 shadow-xl"
                            alt="host-image" width={200} height={200}
                        />
                        <h1 className="text-2xl mt-4 mb-4 font-semibold">Landlord name</h1>
                        <CustomButton label="Contact" />
                    </div>
                </aside>
                <div className="cls-span-1 md:col-span-3 pl-0 md-pl-6">
                    <PropertyList />
                </div>
            </div>
        </main>
    )
}

export default LandLords