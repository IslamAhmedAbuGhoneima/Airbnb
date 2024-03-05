"use client"
import FormContext from '@/app/context/FormContext';
import React, { useContext } from 'react'
import Model from './Model';
import FormButton from '../elements/FormButton';

const SingupModel = () => {
    const { open: { singup }, handelOpenSingup } = useContext(FormContext);
    const content = (
        <form className="space-y-4">
            <input placeholder="username" type="username" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
            <input placeholder="e-mail address" type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
            <input placeholder="password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
            <input placeholder="Repeat password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
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