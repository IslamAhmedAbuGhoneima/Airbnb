import Image from "next/image"
const Categories = () => {
    return (
        <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12 mb-4">
            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100">
                <Image
                    src="/icons/lake.jpg"
                    alt="Category - Beach"
                    width={20}
                    height={20}
                />

                <span className='text-xs'>Lake</span>
            </div>

            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100">
                <Image
                    src="/icons/rooms.jpg"
                    alt="rooms"
                    width={20}
                    height={20}
                />

                <span className='text-xs'>rooms</span>
            </div>

            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100">
                <Image
                    src="/icons/omg.jpg"
                    alt="OMG"
                    width={20}
                    height={20}
                />

                <span className='text-xs'>Omg</span>
            </div>

            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100">
                <Image
                    src="/icons/design.jpg"
                    alt="design"
                    width={20}
                    height={20}
                />

                <span className='text-xs'>Design</span>
            </div>
        </div>
    )
}

export default Categories