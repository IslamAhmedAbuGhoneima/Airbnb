const RoomDetails = ({ price_per_night, bedrooms, bathrooms, guests, onChange }) => {
    return (
        <>
            <h1 className='mt-3 mb-3 font-bold text-lg'>Details</h1>
            <div className='pt-3 pb-6 space-y-4'>
                <div className='flex flex-col space-y-2'>
                    <label>Price per night</label>
                    <input
                        name="price_per_night"
                        value={price_per_night}
                        onChange={onChange}
                        type="number"
                        className='w-full p-4 border border-gray-600 rounded-xl'
                    />
                </div>
                <div className='flex flex-col space-y-2'>
                    <label>Bedrooms</label>
                    <input
                        name="bedrooms"
                        value={bedrooms}
                        onChange={onChange}
                        type="number"
                        className='w-full p-4 border border-gray-600 rounded-xl'
                    />
                </div>
                <div className='flex flex-col space-y-2'>
                    <label>Bathrooms</label>
                    <input
                        name="bathrooms"
                        value={bathrooms}
                        onChange={onChange}
                        type="number"
                        className='w-full p-4 border border-gray-600 rounded-xl'
                    />
                </div>
                <div className='flex flex-col space-y-2'>
                    <label>Maximum number of guests</label>
                    <input
                        name="guests"
                        value={guests}
                        onChange={onChange}
                        type="number"
                        className='w-full p-4 border border-gray-600 rounded-xl'
                    />
                </div>
            </div>
        </>
    )
}

export default RoomDetails