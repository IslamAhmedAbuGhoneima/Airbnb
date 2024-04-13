import { getProperties } from "@/app/services/apiServices";
import PropertyListItem from "./PropertyListItem";

const PropertyList = async ({ landlord_id }) => {
    let url = "http://127.0.0.1:8000/api/properties/";
    if (landlord_id) {
        url += `?landlord_id=${landlord_id}`;
    }
    const properties = await getProperties(url);
    return (
        <>
            <div className="mb-4 grid gap-2 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {
                    properties.map((property) => (
                        <PropertyListItem
                            key={property.uuid}
                            property={property}
                        />
                    ))
                }
            </div>
        </>

    )
}

export default PropertyList