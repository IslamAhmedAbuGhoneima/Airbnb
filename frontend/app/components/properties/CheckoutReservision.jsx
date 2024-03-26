"use client";
import { useEffect, useState } from "react";
import { differenceInDays, eachDayOfInterval, format } from 'date-fns';
import Calender from "../form/Calender";
import { apiPost } from "@/app/services/apiServices";
const CheckoutReservision = ({ price_per_night, guestNumber, propertyId }) => {
    const [reservation, setReservation] = useState({
        nights: 1,
        guests: 1,
        price: price_per_night,
    });
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
    })

    const [fee, setFee] = useState(0);
    const guests = [...Array(guestNumber)].map((_, index) => ++index);
    const [bookedDates, setBookedDates] = useState([]);

    const _setDateRange = (selection) => {
        const newStartDate = new Date(selection.startDate);
        const newEndDate = new Date(selection.endDate);
        if (newEndDate <= newStartDate) {
            newEndDate.setDate(newStartDate.getDate() + 1);
        }
        setDateRange({
            startDate: newStartDate,
            endDate: newEndDate
        })
    }

    const performBooking = async () => {
        const formData = new FormData();
        formData.append('guests', reservation.guests);
        formData.append('price', reservation.price);
        formData.append('number_of_nights', reservation.nights);
        formData.append('start_date', format(dateRange.startDate, 'yyyy-MM-dd'));
        formData.append('end_date', format(dateRange.endDate, 'yyyy-MM-dd'));
        const response = await apiPost(`http://127.0.0.1:8000/api/${propertyId}/book/`, formData);
        if (response.success) {
            console.log('created');
            console.log(response);
        }
    }
    const getReservations = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/${propertyId}/reservations/`);
        const reservations = await response.json();
        let dates = [];
        reservations.forEach(reservation => {
            const range = eachDayOfInterval({
                start: new Date(reservation.start_date),
                end: new Date(reservation.end_date),
            });
            dates = [...dates, ...range];
        });
        setBookedDates(dates);
    }
    useEffect(() => {
        getReservations();
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            );
            if (dayCount && price_per_night) {
                const _fee = Number((((dayCount * +price_per_night) / 100) * 5).toFixed(2));
                const totalPrice = (price_per_night * dayCount) + _fee;
                setFee(_fee);
                setReservation({
                    ...reservation,
                    nights: dayCount,
                    price: totalPrice
                })
            } else {
                const _fee = Number(((price_per_night / 100) * 5).toFixed(2));
                const totalPrice = (+price_per_night + _fee)
                setFee(_fee);
                setReservation({
                    ...reservation,
                    nights: dayCount,
                    price: totalPrice,
                    nights: 1,
                })
            }
        }
    }, [dateRange]);
    return (
        <aside className="shadow-xl p-5 border w-full rounded-xl">
            <div>
                <h1 className="font-bold text-lg mt-2 mb-2">${price_per_night}</h1>
                <p className="mb-2">Total before taxes</p>
            </div>
            <div>
                <Calender
                    value={dateRange}
                    bookedDates={bookedDates}
                    onChange={(value) => _setDateRange(value.range1)}
                />
            </div>
            <div className="cursor-pointer w-full p-2 border rounded-lg">
                <label htmlFor="reserve" className="p-2 w-full">Guest</label>
                <select
                    onChange={
                        (e) => {
                            setReservation({
                                ...reservation,
                                guests: e.target.value,
                            })
                        }}
                    id="reserve"
                    className="w-full p-2"
                >
                    {
                        guests.map((guest) =>
                            <option key={`${guest}-guest`} value={guest}>{guest} guest</option>
                        )
                    }
                </select>
            </div>
            <div className="mt-3">
                <div className="mb-4 flex justify-between align-center">
                    <p>${reservation.nights} nights</p>
                    <p>${price_per_night * reservation.nights}</p>
                </div>
                <div className="mb-4 border-b flex justify-between align-center">
                    <p className="pb-2">AirBnb fee</p>
                    <p>${fee}</p>
                </div>
                <div className="mt-4 flex justify-between align-center font-bold">
                    <p>Total</p>
                    <p>${
                        reservation.price
                    }</p>
                </div>
            </div>

            <button
                onClick={performBooking}
                className="w-full p-3 text-white rounded-xl text-center mt-3 mb-3 bg-airbnbDark hover:bg-airbnb"
            >
                Reserve
            </button>
            <p className="mt-2 text-sm text-center">You won't be charged yet</p>
        </aside>
    )
}

export default CheckoutReservision;