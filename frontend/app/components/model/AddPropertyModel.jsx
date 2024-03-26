"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import FormContext from "@/app/context/FormContext";
import Model from "./Model";
import FormButton from "../form/FormButton";
import Categories from "../categories/Categories";
import SelectCountry from "../addProperty/forms/SelectCountry";
import FormErrors from "../form/FormErrors";
import { getProperties, apiPost } from "@/app/services/apiServices";
import PlaceDetails from "../addProperty/forms/PlaceDetails";
import RoomDetails from "../addProperty/forms/RoomDetails";
import PlaceImage from "../addProperty/forms/PlaceImage";

const AddPropertyModel = () => {
    const [currentForm, setCurrentForm] = useState(1);
    const { open: { addProperty }, handelOpenAddProperty } = useContext(FormContext);
    const [airBnbFormData, setAirBnbFormData] = useState({
        category: '',
        title: '',
        description: '',
        price_per_night: 0,
        bedrooms: 0,
        bathrooms: 0,
        guests: 0,
        image: '',
        country: {
            label: '',
            value: '',
        },
    });
    const [errors, setErrors] = useState([]);
    const router = useRouter();
    const handelChangeInput = (e) => {
        setAirBnbFormData({
            ...airBnbFormData,
            [e.target.name]: e.target.value
        })
    }
    const handelChangeImage = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setAirBnbFormData({
                ...airBnbFormData,
                image: event.target.files[0]
            });
        }
    }

    const handelSubmit = async () => {
        const { title, description, price_per_night, bedrooms, bathrooms, guests, country, image } = airBnbFormData;
        const formData = new FormData();
        formData.append('category', 'village');
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price_per_night', price_per_night);
        formData.append('bedrooms', bedrooms);
        formData.append('bathrooms', bathrooms);
        formData.append('guests', guests);
        formData.append('country', country.label);
        formData.append('country_code', country.value);
        formData.append('image', image);
        const response = await apiPost('http://127.0.0.1:8000/api/properties/create/', formData)
            .then(
                (resolve) => getProperties()
            );
        if (response.success) {
            console.log('SUCCESS :-D');
            router.push('/');
            handelOpenAddProperty();
            setAirBnbFormData({
                category: '',
                title: '',
                description: '',
                price_per_night: 0,
                bedrooms: 0,
                bathrooms: 0,
                guests: 0,
                image: '',
                country: {
                    label: '',
                    value: '',
                },
            })
        } else {
            const tmpErrors = Object.values(response).map((error) => {
                return error;
            });
            setErrors(tmpErrors);
        }

    }
    const content = (
        <>
            {
                currentForm === 1
                    ?
                    <>
                        <h1 className="mt-3 mb-3 font-bold text-lg">Chose category</h1>
                        <Categories />
                        <FormButton
                            label={'next'}
                            onClick={() => setCurrentForm(prev => prev + 1)}
                        />
                    </>
                    :
                    currentForm === 2
                        ?
                        <>
                            <PlaceDetails
                                title={airBnbFormData.title}
                                description={airBnbFormData.description}
                                onChange={handelChangeInput}
                            />
                            <FormButton
                                label='next'
                                onClick={() => setCurrentForm(prev => prev + 1)}
                            />
                            <FormButton
                                label='previous'
                                onClick={() => setCurrentForm(prev => prev - 1)}
                                className='bg-black hover:bg-gray-800'
                            />
                        </>
                        :
                        currentForm === 3
                            ?
                            <>
                                <RoomDetails
                                    price_per_night={airBnbFormData.price_per_night}
                                    bedrooms={airBnbFormData.bedrooms}
                                    bathrooms={airBnbFormData.bathrooms}
                                    guests={airBnbFormData.guests}
                                    onChange={handelChangeInput}
                                />
                                <FormButton
                                    label='next'
                                    onClick={() => setCurrentForm(prev => prev + 1)}
                                />
                                <FormButton
                                    label='previous'
                                    onClick={() => setCurrentForm(prev => prev - 1)}
                                    className='bg-black hover:bg-gray-800'
                                />
                            </>
                            :
                            currentForm === 4
                                ?
                                <>
                                    <h1 className='mt-3 mb-3 font-bold text-lg'>Location</h1>
                                    <div className='pt-3 pb-6 space-y-4'>
                                        <SelectCountry
                                            // value={airBnbFormData.country}
                                            onChange={
                                                (value) => setAirBnbFormData(
                                                    {
                                                        ...airBnbFormData,
                                                        country: value,
                                                    }
                                                )}
                                        />
                                    </div>
                                    <FormButton
                                        label='next'
                                        onClick={() => setCurrentForm(prev => prev + 1)}
                                    />
                                    <FormButton
                                        label='previous'
                                        onClick={() => setCurrentForm(prev => prev - 1)}
                                        className='bg-black hover:bg-gray-800'
                                    />
                                </>
                                :
                                <>
                                    <PlaceImage onChange={handelChangeImage} />
                                    <FormErrors errors={errors} />
                                    <FormButton
                                        label='Submit'
                                        onClick={handelSubmit}
                                    />
                                    <FormButton
                                        label='previous'
                                        onClick={() => setCurrentForm(prev => prev - 1)}
                                        className='bg-black hover:bg-gray-800'
                                    />
                                </>
            }
        </>
    );
    return (
        <Model
            label="Add property"
            isOpen={addProperty}
            closed={handelOpenAddProperty}
            content={content}
        />
    )
}

export default AddPropertyModel;