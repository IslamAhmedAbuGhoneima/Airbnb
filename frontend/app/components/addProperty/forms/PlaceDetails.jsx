const PlaceDetails = ({ title, description, onChange }) => {
    return (
        <>
            <h1 className='mt-3 mb-3 font-bold text-lg'>Describe your place</h1>
            <div className='pt-3 pb-6 space-y-4'>
                <div className='flex flex-col space-y-2'>
                    <label>Title</label>
                    <input
                        name="title"
                        type="text"
                        value={title}
                        onChange={onChange}
                        className='w-full p-4 border border-gray-600 rounded-xl'
                    />
                </div>
                <div className='flex flex-col space-y-2'>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={onChange}
                        className='w-full h-[200px] p-4 border border-gray-600 rounded-xl'
                    ></textarea>
                </div>
            </div>
        </>
    )
}

export default PlaceDetails