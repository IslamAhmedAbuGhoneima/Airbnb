import CheckoutReservision from "@/app/components/properties/CheckoutReservision";
import Image from "next/image";
const PropertyDetail = () => {
    return (
        <main className="max-w-[1200px] mx-auto px-6 mt-5 mb-3">
            <h1 className="text-2xl font-bold mt-4">Villa Saint Antoine</h1>
            <div className="mt-4 mb-4 flex justify-between items-center">
                <div>
                    <span className="cursor-pointer mr-2 font-blod text-base underline">2 reviews</span>
                    <span className="mr-2">Super host</span>
                    <span className="cursor-pointer mr-2 font-blod text-base underline">Chania, Crete, Greece</span>
                </div>
                <div className="flex justify-between items-center gap-3">
                    <div className="cursor-pointer hover:bg-gray-200 rounded-xl p-1 flex justify-between items-center">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                        <span className="ml-2 underline ">share</span>
                    </div>
                    <div className="cursor-pointer hover:bg-gray-200 rounded-xl p-1 flex justify-between items-center">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        <span className="ml-2 underline ">save</span>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden">
                <Image className="rounded-xl w-full h-96" src='/properties/chania.webp' alt="chania house" width={2000} height={2000} />
            </div>


            { /*Start detailed page footer*/}
            <div className="flex justify-between items-start gap-4 mt-4 mb-4 p-5">
                <div className="w-full flex-2 mr-10">
                    <h1 className="font-bold text-2xl">Entire villa in Pithari, Greece</h1>
                    <ul className="mt-1 mb-1 text-sm flex gap-1">
                        <li>10 guests</li>.<li>5 bedrooms</li>. <li>5 beds</li>. <li>8 baths</li>
                    </ul>
                    <div className="flex gap-2 border-b pb-4 pt-4 w-full mt-5 mb-5">
                        <Image className="rounded-full w-12 h-12" src='/hosts/host1.webp' alt="host image" width={100} height={100} />
                        <div className="ml-4">
                            <h5 className="mb-2 text-base font-bold">Hosted by Kostas</h5>
                            <p className="mb-2 text-current text-sm">Superhost 10 years hosting</p>
                        </div>
                    </div>
                </div>
                <div className="w-6/12">
                    <CheckoutReservision />
                </div>
            </div>
            {/* End detailde page footer */}
        </main>
    )
}

export default PropertyDetail;