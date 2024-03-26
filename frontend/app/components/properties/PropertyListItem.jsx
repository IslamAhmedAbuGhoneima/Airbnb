import Image from "next/image"
import Link from "next/link"
import FavoriteButton from "../form/FavoriteButton"
const PropertyListItem = async ({ property }) => {
    return (
        <Link href={`/property/${property.uuid}`} className="mb-5">
            <div className="relative card">
                <div className="relative overflow-hidden rounded-xl h-full aspect-square">
                    <Image
                        className="w-full h-full object-cover hover:scale-125 transition"
                        src={property.image_url}
                        alt={property.title}
                        width={1000}
                        height={1000}
                        loading="lazy"
                    />
                </div>
                <div className="absolute top-2 right-2">
                    <FavoriteButton
                        key={property.uuid}
                        propertyId={property.uuid}
                    />
                </div>
                <div>
                    <h2 className="font-semibold">{property.title}</h2>
                    <p className="text-slate-400">904 kilometers away</p>
                    <p className="text-slate-400">7 nights .<span>jan 16-23</span></p>
                    <div className="underline decoration-solid">
                        ${property.price_per_night}
                        <span className="text-slate-600 text-sm	">total before taxes</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PropertyListItem