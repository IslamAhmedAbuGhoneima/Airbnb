import Image from "next/image"
import Link from "next/link"
const PropertyListItem = ({ property: { title, price_per_night, image_url } }) => {
    return (
        <div href='/property/1564' className="mb-5">
            <div className="card">
                <div className="relative overflow-hidden rounded-xl h-full aspect-square">
                    <Link href='property/12346'>
                        <Image
                            className="w-full h-full object-cover hover:scale-125 transition"
                            src={image_url}
                            alt={title}
                            width={1000}
                            height={1000}
                            loading="lazy"
                        />
                    </Link>
                </div>
                <Link href='property/12346' >
                    <h2 className="font-semibold">{title}</h2>
                    <p className="text-slate-400">904 kilometers away</p>
                    <p className="text-slate-400">7 nights .<span>jan 16-23</span></p>
                    <div className="underline decoration-solid">
                        ${price_per_night} <span className="text-slate-600 text-sm	">total before taxes</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default PropertyListItem