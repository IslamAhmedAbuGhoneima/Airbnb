"use client";
import React, { createContext, useState } from 'react';
import { logoutCookies } from '../lib/actions';
import { useRouter } from 'next/navigation';
const FormContext = createContext();
export const FormProvider = ({ children }) => {
    const [open, setOpen] = useState({
        login: false,
        singup: false,
        addProperty: false,
    });
    const router = useRouter();
    const handelOpenLogin = () => setOpen({ ...open, login: !open.login });
    const handelOpenSingup = () => setOpen({ ...open, singup: !open.singup });
    const handelOpenAddProperty = () => setOpen({ ...open, addProperty: !open.addProperty });


    const logout = () => {
        logoutCookies();
        router.push('/');
    }
    const contextData = {
        open: open,
        handelOpenLogin: handelOpenLogin,
        handelOpenSingup: handelOpenSingup,
        handelOpenAddProperty, handelOpenAddProperty,
        logout: logout,
    }
    return (
        <FormContext.Provider value={contextData}>
            {children}
        </FormContext.Provider>
    )
}
export default FormContext;