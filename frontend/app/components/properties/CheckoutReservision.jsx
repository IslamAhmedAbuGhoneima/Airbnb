const CheckoutReservision = ({ price, guestNumber }) => {
    const guests = [...Array(guestNumber)].map((_, index) => ++index);
    return (
        <aside className="shadow-xl p-5 border w-full rounded-xl">
            <div>
                <h1 className="font-bold text-lg mt-2 mb-2">${price}</h1>
                <p className="mb-2">Total before taxes</p>
            </div>
            <div className="cursor-pointer w-full p-2 border rounded-lg">
                <label htmlFor="reserve" className="p-2 w-full">Guest</label>
                <select id="reserve" className="w-full p-2">
                    {
                        guests.map((guest) =>
                            <option key={`${guest}-guest`} value={`${guest}-guest`}>{guest} guest</option>
                        )
                    }
                </select>
            </div>
            <button className="w-full p-3 text-white rounded-xl text-center mt-3 mb-3 bg-airbnbDark hover:bg-airbnb">Reserve</button>
            <p className="mt-2 text-sm text-center">You won't be charged yet</p>
        </aside>
    )
}

export default CheckoutReservision;