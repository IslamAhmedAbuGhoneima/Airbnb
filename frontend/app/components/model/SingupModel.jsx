"use client"
import FormContext from '@/app/context/FormContext';
import React, { useContext, useState } from 'react'
import Model from './Model';
import FormButton from '../form/FormButton';
import { loginCookies } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import FormErrors from '../form/FormErrors';

const SingupModel = () => {
    const { open: { singup }, handelOpenSingup } = useContext(FormContext);
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password1: "",
        password2: "",
    });
    const [errors, setErrors] = useState([]);
    const router = useRouter();
    const handelInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const singupUser = async () => {
        let data = await fetch("http://127.0.0.1:8000/user/auth/register/", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(formData)
        })
        const response = await data.json();

        if (response.access) {
            const { user: { pk }, access, refresh } = response;
            loginCookies(pk, access, refresh);
            handelOpenSingup();
            router.push("/");
            setFormData(
                {
                    email: "",
                    username: "",
                    password1: "",
                    password2: "",
                }
            );
            setErrors([]);
        } else {
            const tmpErrors = Object.values(response).map((error) => error)
            setErrors(tmpErrors);
        }

    }
    const handelSubmit = (e) => {
        e.preventDefault();
        singupUser();
    }

    const content = (
        <form className="space-y-4" onSubmit={handelSubmit}>
            <input
                onChange={handelInputChange}
                value={formData.username}
                placeholder="Username"
                name='username'
                type="text"
                required
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
            />
            <input
                onChange={handelInputChange}
                value={formData.email}
                placeholder="e-mail address"
                name='email'
                type="email"
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
            />
            <input
                onChange={handelInputChange}
                value={formData.password1}
                placeholder="password"
                name='password1'
                type="password"
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
            />
            <input
                onChange={handelInputChange}
                value={formData.password2}
                placeholder="Repeat password"
                name='password2'
                type="password"
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
            />
            <FormErrors errors={errors} />
            <FormButton
                label="Sing up"
            />
        </form>
    );
    return (
        <Model
            label="Sing Up"
            isOpen={singup}
            closed={handelOpenSingup}
            content={content}
        />
    )
}

export default SingupModel