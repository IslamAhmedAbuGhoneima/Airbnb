"use client";
import { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const getProperties = async () => {
        const data = await fetch("http://127.0.0.1:8000/api/properties/");
        const response = await data.json();
        setProperties(response);
    }
    useEffect(() => {
        getProperties();
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