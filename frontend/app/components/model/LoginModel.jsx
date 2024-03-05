"use client"
import { useContext } from "react"
import Model from "./Model"
import FormContext from "@/app/context/FormContext";
import FormButton from "../elements/FormButton";

const LoginModel = () => {
    const { open: { login }, handelOpenLogin } = useContext(FormContext);
    const content = (
        <>
            <form className="space-y-4">
                <input placeholder="Your e-mail address" type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
                <input placeholder="Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
                <FormButton label="Log in" />
            </form>
        </>
    );
    return (
        <Model
            label="Log in"
            isOpen={login}
            closed={handelOpenLogin}
            content={content}
        />
    )
}

export default LoginModel