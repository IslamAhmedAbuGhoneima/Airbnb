"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormContext from "@/app/context/FormContext";
import Model from "./Model";
import FormButton from "../form/FormButton";
import Image from "next/image"
import SelectCountry from "../addProperty/forms/SelectCountry";
import FormErrors from "../form/FormErrors";
import { getProperties, apiPost, apiGet } from "@/app/services/apiServices";
import PlaceDetails from "../addProperty/forms/PlaceDetails";
import RoomDetails from "../addProperty/forms/RoomDetails";
import PlaceImage from "../addProperty/forms/PlaceImage";

const AddPropertyModel = () => {
    const [currentForm, setCurrentForm] = useState(1);
    const { open: { addProperty }, handelOpenAddProperty } = useContext(FormContext);
    const [categories, setCategories] = useState([]);
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
            console.log(airBnbFormData.image)
        }

    }

    const handelSubmit = async () => {
        const { title, category, description, price_per_night, bedrooms, bathrooms, guests, country, image } = airBnbFormData;
        const formData = new FormData();
        formData.append('category', category.uuid);
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
                async (_) => await getProperties("http://127.0.0.1:8000/api/properties/")
            );
        if (response.success) {
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

    const getCategories = async () => {
        const data = await apiGet("http://127.0.0.1:8000/api/categories/");
        setCategories(data);
    }

    const handleChooseCategory = (category) => {
        setAirBnbFormData(
            {
                ...airBnbFormData,
                category: category
            }
        );
    }

    useEffect(() => {
        getCategories();
    }, [])
    const content = (
        <>
            {
                currentForm === 1
                    ?
                    <>
                        <h1 className="mt-3 mb-3 font-bold text-lg">Choose category</h1>
                        <div className="pt-3 cursor-pointer  flex items-center space-x-12 mb-4">
                            {
                                <>
                                    {
                                        categories.map((category) =>
                                            <div
                                                onClick={() => {
                                                    handleChooseCategory(category);
                                                }
                                                }
                                                key={category.uuid}
                                                className={`pb-4 flex flex-col items-center space-y-2 ${airBnbFormData.category.uuid == category.uuid ? 'opacity-100 border-b-2' : 'opacity-60  border-b-2 border-white  hover:border-gray-200'}`}>
                                                <Image
                                                    src={category.icon_url}
                                                    alt={category.title}
                                                    width={20}
                                                    height={20}
                                                />
                                                <span className='text-xs'>{category.title}</span>
                                            </div>
                                        )
                                    }
                                </>
                            }
                        </div>
                        {
                            airBnbFormData.category !== '' &&
                            <div className="flex items-center border p-3 mb-2 rounded-xl">
                                <h1 className="font-bold mr-2 bg-airbnb rounded-xl p-2 text-white">Choosen:</h1>
                                <div
                                    className="flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 ">
                                    <Image
                                        src={airBnbFormData.category.icon_url}
                                        alt={airBnbFormData.category.title}
                                        width={20}
                                        height={20}
                                    />
                                    <span className='text-xs'>{airBnbFormData.category.title}</span>
                                </div>
                            </div>
                        }
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
                                    {
                                        airBnbFormData.image &&
                                        <Image
                                            src={URL.createObjectURL(airBnbFormData.image)}
                                            className='w-[400px] h-[300px] rounded-xl mt-2 mb-2 m-auto'
                                            width={500}
                                            height={500}
                                        />
                                    }
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