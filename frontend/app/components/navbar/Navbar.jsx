import Link from "next/link"
import Image from "next/image"
import SearchFilter from "./SearchFilter"
import UserNav from "./UserNav"
const Navbar = () => {
    return (
        <nav className='w-full fixed top-0 border-b p-3 z-50 px-4 shadow-lg shadow-gray-600 bg-white'>
            <div className="flex justify-between items-center">
                <Link href='/'>
                    <Image
                        priority={true}
                        className="logo"
                        src='/logo.png'
                        alt="Airbnb Logo"
                        width={100}
                        height={30}
                    />
                </Link>
                <SearchFilter />
                <div>
                    <UserNav />
                </div>
            </div>
        </nav>
    )
}

export default Navbar