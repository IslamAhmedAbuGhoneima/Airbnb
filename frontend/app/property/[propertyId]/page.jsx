import FavoriteButton from "@/app/components/form/FavoriteButton";
import CheckoutReservision from "@/app/components/properties/CheckoutReservision";
import { getUserID } from "@/app/lib/actions";
import Image from "next/image";
import Link from "next/link";

const getProperty = async (propertyId) => {
    const response = await fetch(`http://127.0.0.1:8000/api/property/${propertyId}/`, {
        cache: "no-cache"
    }
    );
    return await response.json();
}

const PropertyDetail = async ({ params }) => {
    const { propertyId } = params;
    const property = await getProperty(propertyId);
    const userId = await getUserID();
    let isFavorite = false;
    property.favorited.
        find(
            (favorite) => favorite == userId ? isFavorite = true : isFavorite = false
        );
    return (
        <main className="max-w-[1200px] mx-auto px-6 mt-5 mb-3">
            <h1 className="text-2xl font-bold mt-4">{property.title}</h1>
            <div className="mt-4 mb-4 flex justify-between items-center">
                <div>
                    <span className="cursor-pointer mr-2 font-blod text-base underline">2 reviews</span>
                    <span className="mr-2">Super host</span>
                    <span className="cursor-pointer mr-2 font-blod text-base underline">{property.country}</span>
                </div>
                <div className="flex justify-between items-center gap-3">
                    <div className="cursor-pointer hover:bg-gray-200 rounded-xl p-1 flex justify-between items-center">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                        <span className="ml-2 underline ">share</span>
                    </div>
                    <div className="cursor-pointer hover:bg-gray-200 rounded-xl p-1 flex justify-between items-center">
                        <FavoriteButton
                            key={propertyId}
                            propertyId={property.uuid}
                            isFavorite={isFavorite}
                        />
                        <span className="ml-2 underline ">save</span>
                    </div>
                </div>
            </div>
            <div className="overflow-hidden">
                <Image
                    className="rounded-xl w-full h-96"
                    src={property.image_url} alt={property.title}
                    width={10000} height={10000} />
            </div>
            <div className="flex justify-between items-start gap-4 mt-4 mb-4 p-5">
                <div className="w-full flex-2 mr-10">
                    <h1 className="font-bold text-2xl">Entire {property.category} in {property.country}</h1>
                    <ul className="mt-1 mb-1 text-sm flex gap-1">
                        <li>{property.guests} guests</li>.<li>{property.bedrooms} bedrooms</li>. <li>{property.bathrooms} baths</li>
                    </ul>
                    <Link
                        href={`/landlords/${property.landlord.id}/`}
                        className="flex gap-2 border-b pb-4 pt-4 w-full mt-5 mb-5">
                        <Image
                            className="rounded-full w-12 h-12"
                            src={property.landlord?.avtart_url || '/hosts/avatar.png'}
                            alt="host image"
                            width={100}
                            height={100} />
                        <div className="ml-4">
                            <h5 className="mb-2 text-base font-bold">Hosted by {property.landlord.username || property.landlord.email}</h5>
                            <p className="mb-2 text-current text-sm">Superhost 10 years hosting</p>
                        </div>
                    </Link>
                    <div>
                        {property.description}
                    </div>
                </div>
                <div className="w-6/12">
                    <CheckoutReservision
                        price_per_night={property.price_per_night}
                        guestNumber={property.guests}
                        propertyId={propertyId}
                    />
                </div>
            </div>
        </main>
    )
}

export default PropertyDetail;