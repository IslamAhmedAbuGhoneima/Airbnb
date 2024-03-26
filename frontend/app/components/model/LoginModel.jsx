"use client"
import { useContext, useState } from "react"
import Model from "./Model"
import FormContext from "@/app/context/FormContext";
import { loginCookies } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import FormErrors from "../form/FormErrors";
import FormButton from "../form/FormButton";


const LoginModel = () => {
    const { open: { login: loginForm }, handelOpenLogin } = useContext(FormContext);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const router = useRouter();
    const [errors, setErrors] = useState([]);

    const handelInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const login = async () => {
        const data = await fetch("http://127.0.0.1:8000/user/auth/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });
        const response = await data.json();
        if (response.access) {
            const { user, access, refresh } = response;
            loginCookies(user.pk, access, refresh);
            handelOpenLogin();
            router.push('/');
            setFormData(
                {
                    email: "",
                    password: "",
                }
            );
            setErrors([]);
        } else {
            const tmpErrors = Object.values(response).map((error) => error)
            setErrors(tmpErrors);
            setFormData(
                {
                    email: "",
                    password: "",
                }
            );
        }
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        login();
    }


    const content = (
        <>
            <form onSubmit={handelSubmit} className="space-y-4">
                <input
                    onChange={handelInputChange}
                    value={formData.email}
                    name="email"
                    placeholder="Your e-mail address"
                    type="email"
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                />
                <input
                    onChange={handelInputChange}
                    value={formData.password}
                    name="password"
                    placeholder="Your password"
                    type="password"
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                />
                <FormErrors errors={errors} />
                <FormButton label="Log in" />
            </form>
        </>
    );
    return (
        <Model
            label="Log in"
            isOpen={loginForm}
            closed={handelOpenLogin}
            content={content}
        />
    )
}

export default LoginModel;