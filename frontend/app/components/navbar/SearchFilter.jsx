const SearchFilter = () => {
    return (
        <div className="search w-[800px] ml-3 mr-3 flex items-center justify-center border border-solid rounded-full ">
            <div className="p-3 cursor-pointer w-[250px] px-8 rounded-full hover:bg-gray-100">
                <p className="text-xs font-semibold">Where</p>
                <p className="text-sm">Wanted location</p>
            </div>
            <div className="p-3 cursor-pointer w-[250px] px-8 rounded-full hover:bg-gray-100">
                <p className="text-xs font-semibold">Check in</p>
                <p className="text-sm">Add dates</p>
            </div>
            <div className="p-3 cursor-pointer w-[250px] px-8 rounded-full hover:bg-gray-100">
                <p className="text-xs font-semibold">Check out</p>
                <p className="text-sm">Add dates</p>
            </div>
            <div className="p-3 flex items-center justify-between cursor-pointer w-[250px] px-8 rounded-full hover:bg-gray-100">
                <div>
                    <p className="text-xs font-semibold">Who</p>
                    <p className="text-sm">Add guests</p>
                </div>
                <div className="cursor-pointer p-3 hover:bg-airbnbDark transition rounded-full text-white bg-airbnb">
                    <svg
                        viewBox="0 0 32 32"
                        style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentColor', strokeWidth: 4, overflow: 'visible' }}
                        aria-hidden="true" role="presentation" focusable="false"
                    >
                        <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default SearchFilter