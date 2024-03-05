"use client";
import React, { createContext, useState } from 'react';
const FormContext = createContext();
export const FormProvider = ({ children }) => {
    const [open, setOpen] = useState({
        login: false,
        singup: false,
    })
    const handelOpenLogin = () => setOpen({ ...open, login: !open.login });
    const handelOpenSingup = () => setOpen({ ...open, singup: !open.singup });
    const contextData = {
        open,
        handelOpenLogin: handelOpenLogin,
        handelOpenSingup: handelOpenSingup,
    }
    return (
        <FormContext.Provider value={contextData}>
            {children}
        </FormContext.Provider>
    )
}
export default FormContext;