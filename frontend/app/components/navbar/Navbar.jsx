import Link from "next/link"
import Image from "next/image"
import SearchFilter from "./SearchFilter"
import UserNav from "./UserNav"
import { getUserID } from "@/app/lib/actions"
import AirbnbHome from "./AirbnbHome"
const Navbar = async () => {
    const userID = await getUserID();
    return (
        <nav className='w-full fixed top-0 border-b p-3 z-50 px-4 shadow-lg shadow-gray-600 bg-white'>
            <div className="flex justify-between items-center">
                <Link href='/'>
                    <Image
                        priority={true}
                        className="min-w-[40px]"
                        src='/logo.png'
                        alt="Airbnb Logo"
                        width={100}
                        height={30}
                    />
                </Link>
                <SearchFilter />
                <div className="relative select-none flex justify-center items-center">
                    <AirbnbHome />
                    <UserNav userID={userID} />
                </div>
            </div>
        </nav>
    )
}

export default Navbar