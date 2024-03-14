'use client';
import { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import { getProperties } from "@/app/services/apiServices";

const PropertyList = async () => {
    const [properties, setProperties] = useState([]);
    const getData = async () => {
        const data = await getProperties();
        setProperties(data);
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="mb-4 grid gap-2 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
                properties.map((property) => {
                    return (
                        <PropertyListItem key={property.uuid} property={property} />
                    )
                })
            }
        </div>
    )
}

export default PropertyList