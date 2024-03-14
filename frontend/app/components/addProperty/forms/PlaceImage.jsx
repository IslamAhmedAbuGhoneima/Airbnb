const PlaceImage = ({ onChange }) => {
    return (
        <>
            <h1 className='mt-3 mb-3 font-bold text-lg'>Image</h1>
            <div className='pt-3 pb-6 space-y-4'>
                <div className='py-4 px-6 bg-gray-600 text-white rounded-xl'>
                    <input
                        onChange={onChange}
                        type="file"
                        accept='image/*'
                    />
                </div>
            </div>
        </>
    )
}

export default PlaceImage