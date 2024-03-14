"use client"
import FormContext from "@/app/context/FormContext";
import { useContext } from "react";
import AddPropertyModel from "../model/AddPropertyModel";

const AirbnbHome = () => {
    const { open: { addProperty }, handelOpenAddProperty } = useContext(FormContext);
    return (
        <>
            <div onClick={handelOpenAddProperty}
                className="cursor-pointer hover:bg-gray-300 text-nowrap lg:text-sm p-2 mr-2 rounded-full">
                Airbnb your home
            </div>
            {
                addProperty &&
                <AddPropertyModel />
            }
        </>
    )
}

export default AirbnbHome;