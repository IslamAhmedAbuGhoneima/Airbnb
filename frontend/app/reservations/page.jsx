"use client"
import Image from "next/image"
import { apiGet, paymentApi } from "../services/apiServices";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const ReservationPage = () => {
    const [userReservations, setUserReservations] = useState([]);
    const router = useRouter();
    const getUserReservations = async () => {
        const data = await apiGet("http://127.0.0.1:8000/user/auth/user-reservations/");
        setUserReservations(data);
    }
    const payForProperty = async (reservation) => {
        const response = await paymentApi(reservation.id);
        const data = await response.json();
        if (response.ok) {
            router.push(data['url']);
        }
    }
    useEffect(() => {
        getUserReservations();
    }, []);
    return (
        <main className="max-w-[1200px] mx-auto px-6 mt-5 mb-3">
            <h1 className="mt-6 mb-2 text-2xl font-semibold">My Reservations</h1>
            {
                userReservations.map((reservation) => (
                    <div
                        key={reservation.id}
                        className="relative p-5 grid grid-cols-1 md:grid-cols-4 gap-4 rounded-xl shadow-md border border-gray-300 mt-4 mb-4">
                        <div className="relative col-span-1 rounded-xl overflow-hidden aspect-square">
                            <Image
                                src={reservation.property.image_url}
                                alt={reservation.property.title}
                                className="w-full h-full object-cover hover:scale-110 transition"
                                width={1000}
                                height={1000}
                            />
                        </div>
                        <div className="col-span-1 text-center md:text-left md:col-span-3">
                            <h2 className="mb-3 text-xl font-semibold">{reservation.property.title}</h2>
                            <div className="mb-3">
                                <p className="font-semibold">Check in date:<span className="ml-3 font-normal">{reservation.start_date}</span></p>
                            </div>
                            <div className="mb-3">
                                <p className="font-semibold">Check out date:<span className="ml-3 font-normal">{reservation.end_date}</span></p>
                            </div>
                            <div className="mb-3">
                                <p className="font-semibold">Number of nights:<span className="ml-3 font-normal">{reservation.number_of_nights}</span></p>
                            </div>
                            <div className="mb-3">
                                <p className="font-semibold">Total price:<span className="ml-3 font-normal">{reservation.price}$</span></p>
                            </div>

                            {
                                reservation.paid ?
                                    <a href={`property/${reservation.property.uuid}`}
                                        className="cursor-pointer mt-6 inline-block text-base text-white py-4 px-6 rounded-xl bg-airbnb hover:bg-airbnbDark transition"
                                    >
                                        Go to Property
                                    </a>
                                    :
                                    <button
                                        onClick={
                                            () => {
                                                payForProperty(reservation)
                                            }
                                        }
                                        type="submit"
                                        className="cursor-pointer mt-6 inline-block text-base text-white py-4 px-6 rounded-xl bg-airbnb hover:bg-airbnbDark transition">
                                        Pay for Property
                                    </button>
                            }







                        </div>
                        <div className={`${reservation.paid ? "paid" : "pending"} absolute bottom-9 right-0`}>
                            {reservation.paid ? <>paid</> : <>pending</>}
                        </div>
                    </div>
                ))
            }





        </main>
    )
}

export default ReservationPage