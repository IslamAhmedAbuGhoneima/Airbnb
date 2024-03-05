import Image from "next/image"
import CustomButton from "../components/elements/CustomButton"
const ReservationPage = () => {
    return (
        <main className="max-w-[1200px] mx-auto px-6 mt-5 mb-3">
            <h1 className="mt-6 mb-2 text-2xl font-semibold">My Reservations</h1>
            <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 rounded-xl shadow-md border border-gray-300 mt-4 mb-4">
                <div className="relative col-span-1 rounded-xl overflow-hidden aspect-square">
                    <Image
                        src='/properties/chania.webp'
                        alt="chania House"
                        className="w-full h-full object-cover hover:scale-110 transition"
                        width={1000}
                        height={1000}
                    />
                </div>

                <div className="col-span-1 text-center md:text-left md:col-span-3">
                    <h2 className="mb-3 text-xl font-semibold">Property Name</h2>
                    <div className="mb-3">
                        <p className="font-semibold">Check in date:<span className="ml-3 font-normal">14/12/2024</span></p>
                    </div>
                    <div className="mb-3">
                        <p className="font-semibold">Check out date:<span className="ml-3 font-normal">30/12/2024</span></p>
                    </div>
                    <div className="mb-3">
                        <p className="font-semibold">Number of nights:<span className="ml-3 font-normal">2</span></p>
                    </div>
                    <div className="mb-3">
                        <p className="font-semibold">Total price:<span className="ml-3 font-normal">200$</span></p>
                    </div>
                    <Button title="Go to property" />
                </div>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 rounded-xl shadow-md border border-gray-300 mt-4 mb-4">
                <div className="relative col-span-1 rounded-xl overflow-hidden aspect-square">
                    <Image
                        src='/properties/chania.webp'
                        alt="chania House"
                        className="w-full h-full object-cover hover:scale-110 transition"
                        width={1000}
                        height={1000}
                    />
                </div>
                <div className="col-span-1 text-center md:text-left md:col-span-3">
                    <h2 className="mb-3 text-xl font-semibold">Property Name</h2>
                    <div className="mb-3">
                        <p className="font-semibold">Check in date:<span className="ml-3 font-normal">14/12/2024</span></p>
                    </div>
                    <div className="mb-3">
                        <p className="font-semibold">Check out date:<span className="ml-3 font-normal">30/12/2024</span></p>
                    </div>
                    <div className="mb-3">
                        <p className="font-semibold">Number of nights:<span className="ml-3 font-normal">2</span></p>
                    </div>
                    <div className="mb-3">
                        <p className="font-semibold">Total price:<span className="ml-3 font-normal">200$</span></p>
                    </div>
                    <CustomButton label="Go to property" />
                </div>
            </div>
        </main>
    )
}

export default ReservationPage